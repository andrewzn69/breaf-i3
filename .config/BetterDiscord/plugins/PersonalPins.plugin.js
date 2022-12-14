/**
 * @name PersonalPins
 * @author DevilBro
 * @authorId 278543574059057154
 * @version 2.1.4
 * @description Allows you to locally pin Messages
 * @invite Jx3TjNS
 * @donate https://www.paypal.me/MircoWittrien
 * @patreon https://www.patreon.com/MircoWittrien
 * @website https://mwittrien.github.io/
 * @source https://github.com/mwittrien/BetterDiscordAddons/tree/master/Plugins/PersonalPins/
 * @updateUrl https://mwittrien.github.io/BetterDiscordAddons/Plugins/PersonalPins/PersonalPins.plugin.js
 */

module.exports = (_ => {
	const changeLog = {
		
	};

	return !window.BDFDB_Global || (!window.BDFDB_Global.loaded && !window.BDFDB_Global.started) ? class {
		constructor (meta) {for (let key in meta) this[key] = meta[key];}
		getName () {return this.name;}
		getAuthor () {return this.author;}
		getVersion () {return this.version;}
		getDescription () {return `The Library Plugin needed for ${this.name} is missing. Open the Plugin Settings to download it. \n\n${this.description}`;}
		
		downloadLibrary () {
			require("request").get("https://mwittrien.github.io/BetterDiscordAddons/Library/0BDFDB.plugin.js", (e, r, b) => {
				if (!e && b && r.statusCode == 200) require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0BDFDB.plugin.js"), b, _ => BdApi.showToast("Finished downloading BDFDB Library", {type: "success"}));
				else BdApi.alert("Error", "Could not download BDFDB Library Plugin. Try again later or download it manually from GitHub: https://mwittrien.github.io/downloader/?library");
			});
		}
		
		load () {
			if (!window.BDFDB_Global || !Array.isArray(window.BDFDB_Global.pluginQueue)) window.BDFDB_Global = Object.assign({}, window.BDFDB_Global, {pluginQueue: []});
			if (!window.BDFDB_Global.downloadModal) {
				window.BDFDB_Global.downloadModal = true;
				BdApi.showConfirmationModal("Library Missing", `The Library Plugin needed for ${this.name} is missing. Please click "Download Now" to install it.`, {
					confirmText: "Download Now",
					cancelText: "Cancel",
					onCancel: _ => {delete window.BDFDB_Global.downloadModal;},
					onConfirm: _ => {
						delete window.BDFDB_Global.downloadModal;
						this.downloadLibrary();
					}
				});
			}
			if (!window.BDFDB_Global.pluginQueue.includes(this.name)) window.BDFDB_Global.pluginQueue.push(this.name);
		}
		start () {this.load();}
		stop () {}
		getSettingsPanel () {
			let template = document.createElement("template");
			template.innerHTML = `<div style="color: var(--header-primary); font-size: 16px; font-weight: 300; white-space: pre; line-height: 22px;">The Library Plugin needed for ${this.name} is missing.\nPlease click <a style="font-weight: 500;">Download Now</a> to install it.</div>`;
			template.content.firstElementChild.querySelector("a").addEventListener("click", this.downloadLibrary);
			return template.content.firstElementChild;
		}
	} : (([Plugin, BDFDB]) => {
		let _this;
		
		const pinIconGeneral = `<svg name="Note" width="24" height="24" viewBox="0 0 24 24"><mask/><path fill="currentColor" mask="url(#pinIconMask)" d="M 6.7285156 2 C 6.4051262 2 6.1425781 2.2615247 6.1425781 2.5859375 L 6.1425781 3.7578125 C 6.1425781 4.081202 6.4041028 4.34375 6.7285156 4.34375 C 7.0529284 4.34375 7.3144531 4.0822254 7.3144531 3.7578125 L 7.3144531 2.5859375 C 7.3144531 2.2615247 7.0529284 2 6.7285156 2 z M 10.244141 2 C 9.9207511 2 9.6582031 2.2615247 9.6582031 2.5859375 L 9.6582031 3.7578125 C 9.6582031 4.081202 9.9197277 4.34375 10.244141 4.34375 C 10.568554 4.34375 10.830078 4.0822254 10.830078 3.7578125 L 10.830078 2.5859375 C 10.830078 2.2615247 10.568554 2 10.244141 2 z M 13.759766 2 C 13.436377 2 13.173828 2.2615247 13.173828 2.5859375 L 13.173828 3.7578125 C 13.173828 4.081202 13.435354 4.34375 13.759766 4.34375 C 14.083156 4.34375 14.347656 4.0822254 14.347656 3.7578125 L 14.347656 2.5859375 C 14.346656 2.2615247 14.083156 2 13.759766 2 z M 17.275391 2 C 16.952002 2 16.689453 2.2615247 16.689453 2.5859375 L 16.689453 3.7578125 C 16.689453 4.081202 16.950979 4.34375 17.275391 4.34375 C 17.598781 4.34375 17.863281 4.0822254 17.863281 3.7578125 L 17.863281 2.5859375 C 17.862281 2.2615247 17.598781 2 17.275391 2 z M 4.9667969 3.2792969 C 4.2903399 3.5228623 3.8007813 4.1662428 3.8007812 4.9296875 L 3.8007812 20.242188 C 3.8007812 21.211333 4.5884253 22 5.5585938 22 L 18.447266 22 C 19.41641 22 20.205078 21.212356 20.205078 20.242188 L 20.205078 4.9296875 C 20.204054 4.1662428 19.713754 3.5228623 19.033203 3.2792969 L 19.033203 3.7578125 C 19.033203 4.7269575 18.245559 5.515625 17.275391 5.515625 C 16.306246 5.515625 15.517578 4.7279808 15.517578 3.7578125 C 15.517578 4.7269575 14.72798 5.515625 13.757812 5.515625 C 12.788668 5.515625 12 4.7279808 12 3.7578125 C 12 4.7269575 11.212357 5.515625 10.242188 5.515625 C 9.2730428 5.515625 8.484375 4.7279808 8.484375 3.7578125 C 8.484375 4.7269575 7.6967309 5.515625 6.7265625 5.515625 C 5.7574176 5.515625 4.9667969 4.7279808 4.9667969 3.7578125 L 4.9667969 3.2792969 z M 6.7285156 7.2734375 L 17.275391 7.2734375 C 17.598781 7.2734375 17.861328 7.5349622 17.861328 7.859375 C 17.861328 8.1837878 17.598781 8.4453125 17.275391 8.4453125 L 6.7285156 8.4453125 C 6.4051262 8.4453125 6.1425781 8.1837878 6.1425781 7.859375 C 6.1425781 7.5349622 6.4041028 7.2734375 6.7285156 7.2734375 z M 6.7285156 10.787109 L 17.275391 10.787109 C 17.598781 10.787109 17.861328 11.050587 17.861328 11.375 C 17.861328 11.699413 17.598781 11.960938 17.275391 11.960938 L 6.7285156 11.960938 C 6.4051262 11.960938 6.1425781 11.699413 6.1425781 11.375 C 6.1425781 11.050587 6.4041028 10.787109 6.7285156 10.787109 z M 6.7285156 14.380859 L 17.275391 14.380859 C 17.598781 14.380859 17.861328 14.642384 17.861328 14.966797 C 17.861328 15.29121 17.598781 15.552734 17.275391 15.552734 L 6.7285156 15.552734 C 6.4051262 15.552734 6.1425781 15.29121 6.1425781 14.966797 C 6.1425781 14.643408 6.4041028 14.380859 6.7285156 14.380859 z M 6.7285156 17.896484 L 17.275391 17.896484 C 17.598781 17.896484 17.861328 18.158009 17.861328 18.482422 C 17.861328 18.806835 17.598781 19.068359 17.275391 19.068359 L 6.7285156 19.068359 C 6.4051262 19.068359 6.1425781 18.806835 6.1425781 18.482422 C 6.1425781 18.159033 6.4041028 17.896484 6.7285156 17.896484 z"/><extra/></svg>`;
		const pinIconMask = `<mask id="pinIconMask" fill="black"><path fill="white" d="M 0 0 H 24 V 24 H 0 Z"/><path fill="black" d="M24 12 H 12 V 24 H 24 Z"/></mask>`;
		const pinIcon = pinIconGeneral.replace(`<extra/>`, ``).replace(`<mask/>`, ``).replace(` mask="url(#pinIconMask)"`, ``);
		const pinIconDelete = pinIconGeneral.replace(`<extra/>`, `<path fill="none" stroke="#f04747" stroke-width="2" d="m 14.702359,14.702442 8.596228,8.596148 m 0,-8.597139 -8.59722,8.596147 z"/>`).replace(`<mask/>`, pinIconMask);
		const pinIconUpdate = pinIconGeneral.replace(`<extra/>`, `<path fill="#43b581" d="M 24,18.375879 V 14 l -1.470407,1.468882 C 21.626418,14.562588 20.378506,14 18.996922,14 16.232873,14 14,16.238045 14,19 c 0,2.761955 2.231994,5 4.996043,5 2.32873,0 4.280186,-1.594585 4.833347,-3.750879 h -1.301556 c -0.516226,1.455696 -1.89781,2.5 -3.53355,2.5 -2.073696,0 -3.752528,-1.678973 -3.752528,-3.750879 0,-2.071906 1.678832,-3.750879 3.751649,-3.750879 1.034209,0 1.962887,0.430731 2.641808,1.109353 L 19.6178,18.372363 H 24 Z"/>`).replace(`<mask/>`, pinIconMask);
		
		const filterKeys = ["channel", "server", "all"];
		const sortKeys = ["notetime", "messagetime"];
		const orderKeys = ["ascending", "descending"];
		
		const popoutProps = {};
		let notes = {};
		
		const NotesPopoutComponent = class NotesPopout extends BdApi.React.Component {
			containsSearchkey(data, key, searchKey) {
				let value = BDFDB.ObjectUtils.get(data, key);
				return value && value.toUpperCase().indexOf(searchKey) > -1;
			}
			filterMessages() {
				let messages = [], updateData = false;
				for (let guild_id in notes) for (let channel_id in notes[guild_id]) for (let message_idPOS in notes[guild_id][channel_id]) {
					let message = JSON.parse(notes[guild_id][channel_id][message_idPOS].message);
					message.author = new BDFDB.DiscordObjects.User(message.author);
					if (message.interaction && message.interaction.user) message.interaction.user = new BDFDB.DiscordObjects.User(message.interaction.user);
					message.timestamp = new BDFDB.DiscordObjects.Timestamp(message.timestamp);
					message.editedTimestamp = message.editedTimestamp && new BDFDB.DiscordObjects.Timestamp(message.editedTimestamp);
					if (message.customRenderedContent && message.customRenderedContent.content.length) message.customRenderedContent.content = BDFDB.ReactUtils.objectToReact(message.customRenderedContent.content);
					for (let embed of message.embeds) {
						embed.color = typeof embed.color != "string" ? null : embed.color;
						embed.timestamp = embed.timestamp && new BDFDB.DiscordObjects.Timestamp(embed.timestamp);
					}
					message.embeds = message.embeds.filter(n => !(n && n.type == "gifv"));
					message.reactions = [];
					message = new BDFDB.DiscordObjects.Message(message);
					let channel = notes[guild_id][channel_id][message_idPOS].channel && new BDFDB.DiscordObjects.Channel(JSON.parse(notes[guild_id][channel_id][message_idPOS].channel));
					if (!channel) {
						channel = BDFDB.LibraryStores.ChannelStore.getChannel(message.channel_id);
						if (channel) {
							updateData = true;
							notes[guild_id][channel_id][message_idPOS].channel = JSON.stringify(channel);
						}
					}
					if (!BDFDB.MessageUtils.isSystemMessage(message)) messages.push({
						note: notes[guild_id][channel_id][message_idPOS],
						channel_id: channel_id,
						guild_id: guild_id,
						message: message,
						channel: channel,
						messagetime: notes[guild_id][channel_id][message_idPOS].timestamp,
						notetime: notes[guild_id][channel_id][message_idPOS].addedat
					});
				}
				if (updateData) BDFDB.DataUtils.save(notes, _this, "notes");
				let allCount = messages.length;
				let currentChannel = BDFDB.LibraryStores.ChannelStore.getChannel(BDFDB.LibraryStores.SelectedChannelStore.getChannelId()) || {};
				switch (popoutProps.selectedFilter.value) {
					case "channel":
						messages = messages.filter(m => m.channel_id == currentChannel.id);
						break;
					case "server":
						messages = messages.filter(m => m.guild_id == (currentChannel.guild_id || BDFDB.DiscordConstants.ME));
						break;
					case "allservers":
						messages = messages;
						break;
				}
				let searchKey = popoutProps.searchKey.toUpperCase();
				if (searchKey) {
					let searchValues = ["content", "author.username", "rawDescription", "author.name"];
					messages = messages.filter(m => m.note.tags && m.note.tags.some(tag => tag.indexOf(searchKey.toUpperCase()) > -1) || searchValues.some(key => this.containsSearchkey(m.message, key, searchKey) || m.message.embeds.some(embed => this.containsSearchkey(embed, key, searchKey))));
				}
				BDFDB.ArrayUtils.keySort(messages, popoutProps.selectedSort.value);
				if (popoutProps.selectedOrder.value != "descending") messages.reverse();
				return [messages, allCount];
			}
			renderMessage(note, message, channel) {
				if (!message || !channel) return null;
				let channelName = channel.name;
				let guild = channel.guild_id && BDFDB.LibraryStores.GuildStore.getGuild(channel.guild_id);
				let role = guild && BDFDB.LibraryModules.PermissionRoleUtils.getHighestRole(guild, message.author.id);
				if (role) message.colorString = role.colorString;
				if (popoutProps.selectedFilter.value != "channel" && !channelName && channel.recipients.length > 0) {
					for (let dmuser_id of channel.recipients) {
						channelName = channelName ? channelName + ", @" : channelName;
						channelName = channelName + ((BDFDB.LibraryStores.UserStore.getUser(dmuser_id) || {}).username || BDFDB.LanguageUtils.LanguageStrings.UNKNOWN_USER);
					}
				}
				return [
					popoutProps.selectedFilter.value != "channel" && BDFDB.ReactUtils.createElement("div", {
						className: BDFDB.disCN.messagespopoutchannelseparator,
						children: [
							BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Clickable, {
								tag: "span",
								className: BDFDB.disCN.messagespopoutchannelname,
								onClick: _ => {
									if (!channel.guild_id || BDFDB.LibraryStores.GuildStore.getGuild(channel.guild_id)) BDFDB.LibraryModules.HistoryUtils.transitionTo(BDFDB.DiscordConstants.Routes.CHANNEL(channel.guild_id, channel.id));
								},
								children: channelName ? ((channel.guild_id ? "#" : "@") + channelName) : "???"
							}),
							popoutProps.selectedFilter.value == "all" ? BDFDB.ReactUtils.createElement("span", {
								className: BDFDB.disCN.messagespopoutguildname,
								children: channel.guild_id ? (BDFDB.LibraryStores.GuildStore.getGuild(channel.guild_id) || {}).name || BDFDB.LanguageUtils.LanguageStrings.GUILD_UNAVAILABLE_HEADER : BDFDB.LanguageUtils.LanguageStrings.DIRECT_MESSAGES
							}) : null
						]
					}),
					BDFDB.ReactUtils.createElement("div", {
						className: BDFDB.disCN.messagespopoutgroupwrapper,
						key: message.id,
						children: [
							BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.MessageGroup, {
								className: BDFDB.disCN.messagespopoutgroupcozy,
								message: message,
								channel: channel,
								onContextMenu: e => BDFDB.MessageUtils.openMenu(message, e, true)
							}, true),
							BDFDB.ReactUtils.createElement("div", {
								className: BDFDB.disCN.messagespopoutactionbuttons,
								children: [
									(!channel.guild_id || BDFDB.LibraryStores.GuildStore.getGuild(channel.guild_id)) && BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Clickable, {
										className: BDFDB.disCN.messagespopoutjumpbutton,
										onClick: _ => BDFDB.LibraryModules.HistoryUtils.transitionTo(BDFDB.DiscordConstants.Routes.CHANNEL(channel.guild_id, channel.id, message.id)),
										children: BDFDB.ReactUtils.createElement("div", {
											children: BDFDB.LanguageUtils.LanguageStrings.JUMP
										})
									}),
									BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Clickable, {
										className: BDFDB.disCN.messagespopoutjumpbutton,
										onClick: _ => {
											if (message.content || message.attachments.length > 1) {
												let text = message.content || "";
												for (let attachment of message.attachments) if (attachment.url) text += ((text ? "\n" : "") + attachment.url);
												BDFDB.LibraryModules.WindowUtils.copy(text);
											}
											else if (message.attachments.length == 1 && message.attachments[0].url) {
												BDFDB.LibraryModules.WindowUtils.copyImage(message.attachments[0].url);
											}
										},
										children: BDFDB.ReactUtils.createElement("div", {
											children: BDFDB.LanguageUtils.LanguageStrings.COPY
										})
									}),
									BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Button, {
										look: BDFDB.LibraryComponents.Button.Looks.BLANK,
										size: BDFDB.LibraryComponents.Button.Sizes.NONE,
										onClick: _ => {
											_this.removeNoteData(note);
											BDFDB.ReactUtils.forceUpdate(this);
										},
										children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SvgIcon, {
											className: BDFDB.disCN.messagespopoutclosebutton,
											name: BDFDB.LibraryComponents.SvgIcon.Names.CLOSE
										})
									})
								]
							}),
							BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Flex, {
								wrap: BDFDB.LibraryComponents.Flex.Wrap.WRAP,
								justify: BDFDB.LibraryComponents.Flex.Justify.END,
								children: [note.tags].flat(10).filter(n => n).map(label => BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Badges.TextBadge, {
									className: BDFDB.disCN._personalpinsmessagetag,
									color: "var(--background-tertiary)",
									onClick: _ => {
										BDFDB.ArrayUtils.remove(note.tags, label, true);
										BDFDB.DataUtils.save(notes, _this, "notes");
										BDFDB.ReactUtils.forceUpdate(this);
									},
									text: [
										BDFDB.ReactUtils.createElement("div", {
											className: BDFDB.disCN._personalpinsmessagetagname,
											children: label
										}),
										BDFDB.ReactUtils.createElement("div", {
											className: BDFDB.disCN._personalpinsmessagetagdelete,
											children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SvgIcon, {
												name: BDFDB.LibraryComponents.SvgIcon.Names.CLOSE,
												width: 14,
												height: 14,
												nativeClass: true,
											})
										})
									]
								})).concat(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.PopoutContainer, {
									children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Badges.TextBadge, {
										className: BDFDB.disCNS._personalpinsmessagetag + BDFDB.disCN._personalpinsmessagetagadd,
										color: "var(--background-tertiary)",
										text: "+"
									}),
									animation: BDFDB.LibraryComponents.PopoutContainer.Animation.SCALE,
									position: BDFDB.LibraryComponents.PopoutContainer.Positions.TOP,
									align: BDFDB.LibraryComponents.PopoutContainer.Align.CENTER,
									arrow: true,
									onOpen: instance => BDFDB.DOMUtils.addClass(instance.domElementRef.current, BDFDB.disCN._personalpinsmessagetagaddactive),
									onClose: instance => BDFDB.DOMUtils.removeClass(instance.domElementRef.current, BDFDB.disCN._personalpinsmessagetagaddactive),
									renderPopout: instance => BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TextInput, {
										onKeyDown: (event, textInstance) => {
											let tag = textInstance.props.value && textInstance.props.value.toUpperCase();
											if (tag && event.which == 13 && (!note.tags || note.tags.indexOf(tag) == -1)) {
												instance.toggle();
												if (!note.tags) note.tags = [];
												note.tags.push(tag);
												BDFDB.DataUtils.save(notes, _this, "notes");
												BDFDB.ReactUtils.forceUpdate(this);
											}
										}
									})
								}))
							})
						]
					})
				];
			}
			render() {
				let searchTimeout;
				const [messages, allCount] = this.filterMessages();
				return BDFDB.ReactUtils.createElement(BDFDB.ReactUtils.Fragment, {
					children: [
						BDFDB.ReactUtils.createElement("div", {
							className: BDFDB.disCNS.messagespopouttabbarheader + BDFDB.disCN.messagespopoutheader,
							style: {paddingBottom: 4},
							children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Flex, {
								direction: BDFDB.LibraryComponents.Flex.Direction.VERTICAL,
								children: [
									BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Flex, {
										className: BDFDB.disCN.marginbottom4,
										align: BDFDB.LibraryComponents.Flex.Align.CENTER,
										children: [
											BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Flex.Child, {
												className: BDFDB.disCN.messagespopouttitle,
												children: `${_this.labels.popout_note} - ${messages.length}/${allCount}`
											}),
											BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SearchBar, {
												query: popoutProps.searchKey,
												onChange: value => {
													BDFDB.TimeUtils.clear(searchTimeout);
													searchTimeout = BDFDB.TimeUtils.timeout(_ => {
														popoutProps.searchKey = value;
														BDFDB.ReactUtils.forceUpdate(this);
													}, 1000);
												},
												onClear: _ => {
													popoutProps.searchKey = "";
													BDFDB.ReactUtils.forceUpdate(this);
												}
											})
										]
									}),
									BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Flex, {
										align: BDFDB.LibraryComponents.Flex.Align.CENTER,
										children: [
											BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TabBar, {
												className: BDFDB.disCN.messagespopouttabbar,
												itemClassName: BDFDB.disCN.messagespopouttabbartab,
												itemSelectedClassName: BDFDB.disCN.messagespopouttabbartabactive,
												type: BDFDB.LibraryComponents.TabBar.Types.TOP_PILL,
												selectedItem: popoutProps.selectedFilter.value,
												items: filterKeys.map(option => _this.getPopoutValue(option, "filter")),
												onItemSelect: option => {
													popoutProps.selectedFilter = _this.getPopoutValue(option, "filter");
													BDFDB.ReactUtils.forceUpdate(this);
												}
											}),
											BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.QuickSelect, {
												label: BDFDB.LanguageUtils.LibraryStrings.sort_by + ":",
												value: popoutProps.selectedSort,
												options: sortKeys.map(option => _this.getPopoutValue(option, "sort")),
												onChange: option => {
													popoutProps.selectedSort = _this.getPopoutValue(option, "sort");
													BDFDB.ReactUtils.forceUpdate(this);
												}
											}),
											BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.QuickSelect, {
												label: BDFDB.LanguageUtils.LibraryStrings.order + ":",
												value: popoutProps.selectedOrder,
												options: orderKeys.map(option => _this.getPopoutValue(option, "order")),
												onChange: option => {
													popoutProps.selectedOrder = _this.getPopoutValue(option, "order");
													BDFDB.ReactUtils.forceUpdate(this);
												}
											})
										]
									})
								]
							})
						}),
						messages.length ? BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.PaginatedList, {
							className: BDFDB.disCN.messagespopout,
							items: messages,
							amount: 25,
							copyToBottom: true,
							renderItem: messageData => this.renderMessage(messageData.note, messageData.message, messageData.channel).flat(10).filter(n => n)
						}) : BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.MessagesPopoutComponents.EmptyState, {
							msg: BDFDB.LanguageUtils.LanguageStrings.AUTOCOMPLETE_NO_RESULTS_HEADER,
							image: BDFDB.DiscordUtils.getTheme() == BDFDB.disCN.themelight ? "/assets/03c7541028afafafd1a9f6a81cb7f149.svg" : "/assets/6793e022dc1b065b21f12d6df02f91bd.svg"
						})
					]
				});
			}
		};
	
		return class PersonalPins extends Plugin {
			onLoad () {
				_this = this;
				
				this.defaults = {
					choices: {
						defaultFilter:		{value: filterKeys[0], 		options: filterKeys,	type: "filter",		description: "Default choice tab"},
						defaultSort:		{value: sortKeys[0], 		options: sortKeys,		type: "sort",		description: "Default sort choice"},
						defaultOrder:		{value: orderKeys[0], 		options: orderKeys,		type: "order",		description: "Default order choice"},
					}
				};
			
				this.modulePatches = {
					before: [
						"HeaderBar"
					],
					after: [
						"MessageActionsContextMenu",
						"MessageToolbar"
					]
				};
				
				this.css = `
					${BDFDB.dotCN._personalpinsmessagetag} {
						margin: 0 3px 4px 3px;
						cursor: pointer;
					}
					${BDFDB.dotCN._personalpinsmessagetag}:hover ${BDFDB.dotCN._personalpinsmessagetagname} {
						height: 0;
						visibility: hidden;
					}
					${BDFDB.dotCNS._personalpinsmessagetag + BDFDB.dotCN._personalpinsmessagetagdelete} {
						visibility: hidden;
					}
					${BDFDB.dotCN._personalpinsmessagetag}:hover ${BDFDB.dotCN._personalpinsmessagetagdelete} {
						visibility: visible;
					}
					${BDFDB.dotCN._personalpinsmessagetag + BDFDB.notCN._personalpinsmessagetagadd}:hover {
						background-color: var(--bdfdb-red) !important;
					}
					${BDFDB.dotCN._personalpinsmessagetagadd} {
						font-size: 16px;
					}
					${BDFDB.dotCN._personalpinsmessagetagadd + BDFDB.dotCN._personalpinsmessagetagaddactive} {
						background-color: var(--bdfdb-blurple) !important;
					}
				`;
			}
			
			onStart () {
				notes = BDFDB.DataUtils.load(this, "notes");
				
				BDFDB.PatchUtils.patch(this, BDFDB.LibraryModules.DispatchApiUtils, "dispatch", {after: e => {
					if (BDFDB.ObjectUtils.is(e.methodArguments[0]) && e.methodArguments[0].type == "MESSAGE_DELETE") {
						let note = this.getNoteData({id: e.methodArguments[0].id, channel_id: e.methodArguments[0].channelId});
						if (note) this.removeNoteData(note, true);
					}
				}});
				
				BDFDB.DiscordUtils.rerenderAll();
			}
			
			onStop () {
				BDFDB.DiscordUtils.rerenderAll();
			}

			getSettingsPanel (collapseStates = {}) {
				let settingsPanel;
				return settingsPanel = BDFDB.PluginUtils.createSettingsPanel(this, {
					collapseStates: collapseStates,
					children: _ => {
						let settingsItems = [];
						
						for (let key in this.settings.choices) settingsItems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsSaveItem, {
							type: "Select",
							plugin: this,
							keys: ["choices", key],
							label: this.defaults.choices[key].description,
							basis: "50%",
							value: this.settings.choices[key],
							options: (this.defaults.choices[key].options || []).map(option => this.getPopoutValue(option, this.defaults.choices[key].type)),
							searchable: true
						}));
						
						settingsItems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsItem, {
							type: "Button",
							color: BDFDB.LibraryComponents.Button.Colors.RED,
							label: "Delete all Notes",
							onClick: _ => BDFDB.ModalUtils.confirm(this, "Are you sure you want to delete all pinned Notes?", _ => {
								notes = {};
								BDFDB.DataUtils.remove(this, "notes");
							}),
							children: BDFDB.LanguageUtils.LanguageStrings.DELETE
						}));
						
						return settingsItems;
					}
				});
			}

			onSettingsClosed () {
				if (this.SettingsUpdated) {
					delete this.SettingsUpdated;
					BDFDB.DiscordUtils.rerenderAll();
				}
			}

			onMessageContextMenu (e) {
				if (e.instance.props.message && e.instance.props.channel) {
					let note = this.getNoteData(e.instance.props.message, e.instance.props.channel);
					let hint = BDFDB.BDUtils.isPluginEnabled("MessageUtilities") ? BDFDB.BDUtils.getPlugin("MessageUtilities").getActiveShortcutString("__Note_Message") : null;
					let [children, index] = BDFDB.ContextMenuUtils.findItem(e.returnvalue, {id: ["pin", "unpin"]});
					if (index == -1) [children, index] = BDFDB.ContextMenuUtils.findItem(e.returnvalue, {id: ["edit", "add-reaction", "quote"]});
					children.splice(index > -1 ? index + 1: 0, 0, BDFDB.ContextMenuUtils.createItem(BDFDB.LibraryComponents.MenuItems.MenuItem, {
						label: note ? this.labels.context_unpinoption : this.labels.context_pinoption,
						id: BDFDB.ContextMenuUtils.createItemId(this.name, note ? "unpin-note" : "pin-note"),
						hint: hint && (_ => BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.MenuItems.MenuHint, {
							hint: hint
						})),
						icon: _ => BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.MenuItems.MenuIcon, {
							icon: note ? pinIconDelete : pinIcon
						}),
						action: _ => this.addMessageToNotes(e.instance.props.message, e.instance.props.channel)
					}));
					if (this.isNoteOutdated(note, e.instance.props.message)) children.splice(index > -1 ? index + 1: 0, 0, BDFDB.ContextMenuUtils.createItem(BDFDB.LibraryComponents.MenuItems.MenuItem, {
						label: this.labels.context_updateoption,
						id: BDFDB.ContextMenuUtils.createItemId(this.name, "update-note"),
						icon: _ => BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.MenuItems.MenuIcon, {
							icon: pinIconUpdate
						}),
						action: _ => this.updateNoteData(note, e.instance.props.message)
					}));
				}
			}
			
			processMessageActionsContextMenu (e) {
				if (e.instance.props.message && e.instance.props.channel) {
					let note = this.getNoteData(e.instance.props.message, e.instance.props.channel);
					let [children, index] = BDFDB.ContextMenuUtils.findItem(e.returnvalue, {id: ["pin", "unpin"]});
					children.splice(index + 1, 0, BDFDB.ContextMenuUtils.createItem(BDFDB.LibraryComponents.MenuItems.MenuItem, {
						label: note ? this.labels.context_unpinoption : this.labels.context_pinoption,
						id: BDFDB.ContextMenuUtils.createItemId(this.name, note ? "unpin-note" : "pin-note"),
						icon: _ => BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.MenuItems.MenuIcon, {
							icon: note ? pinIconDelete : pinIcon
						}),
						action: _ => this.addMessageToNotes(e.instance.props.message, e.instance.props.channel)
					}));
					if (this.isNoteOutdated(note, e.instance.props.message)) children.splice(index + 1, 0, BDFDB.ContextMenuUtils.createItem(BDFDB.LibraryComponents.MenuItems.MenuItem, {
						label: this.labels.context_updateoption,
						id: "update-note",
						icon: _ => BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.MenuItems.MenuIcon, {
							icon: pinIconUpdate
						}),
						action: _ => this.updateNoteData(note, e.instance.props.message)
					}));
				}
			}
		
			processMessageToolbar (e) {
				if (e.instance.props.expanded && e.instance.props.message && e.instance.props.channel) {
					let note = this.getNoteData(e.instance.props.message, e.instance.props.channel);
					e.returnvalue.props.children.unshift(BDFDB.ReactUtils.createElement(class extends BdApi.React.Component {
						render() {
							return BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TooltipContainer, {
								key: note ? "unpin-note" : "pin-note",
								text: _ => note ? _this.labels.context_unpinoption : _this.labels.context_pinoption,
								children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Clickable, {
									className: BDFDB.disCN.messagetoolbarbutton,
									onClick: _ => {
										_this.addMessageToNotes(e.instance.props.message, e.instance.props.channel);
										note = _this.getNoteData(e.instance.props.message, e.instance.props.channel);
										BDFDB.ReactUtils.forceUpdate(this);
									},
									children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SvgIcon, {
										className: BDFDB.disCN.messagetoolbaricon,
										iconSVG: note ? pinIconDelete : pinIcon
									})
								})
							})
						}
					}));
					if (this.isNoteOutdated(note, e.instance.props.message)) e.returnvalue.props.children.unshift(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TooltipContainer, {
						key: "update-note",
						text: this.labels.context_updateoption,
						children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Clickable, {
							className: BDFDB.disCN.messagetoolbarbutton,
							onClick: _ => this.updateNoteData(note, e.instance.props.message),
							children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SvgIcon, {
								className: BDFDB.disCN.messagetoolbaricon,
								iconSVG: pinIconUpdate
							})
						})
					}));
				}
			}

			processHeaderBar (e) {
				if (!e.instance.props.toolbar) return;
				let [children, index] = BDFDB.ReactUtils.findParent(e.instance.props.toolbar, {props: [["className", BDFDB.disCN.channelheadersearch]]});
				if (index > -1) children.splice(index, 0, BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.PopoutContainer, {
					children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TooltipContainer, {
						text: this.labels.popout_note,
						tooltipConfig: {type: "bottom"},
						children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Clickable, {
							className: BDFDB.disCNS.channelheadericonwrapper + BDFDB.disCN.channelheadericonclickable,
							children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SvgIcon, {
								className: BDFDB.disCNS.channelheadericon,
								iconSVG: pinIcon
							})
						})
					}),
					popoutClassName: BDFDB.disCN.messagespopoutwrap,
					animation: BDFDB.LibraryComponents.PopoutContainer.Animation.SCALE,
					position: BDFDB.LibraryComponents.PopoutContainer.Positions.BOTTOM,
					align: BDFDB.LibraryComponents.PopoutContainer.Align.RIGHT,
					width: 750,
					maxHeight: "calc(100vh - 100px)",
					onClose: instance => BDFDB.DOMUtils.removeClass(instance.domElementRef.current, BDFDB.disCN.channelheadericonselected),
					renderPopout: instance => {
						BDFDB.DOMUtils.addClass(instance.domElementRef.current, BDFDB.disCN.channelheadericonselected);
						popoutProps.selectedFilter = popoutProps.selectedFilter || this.getPopoutValue(this.settings.choices.defaultFilter || filterKeys[0], "filter");
						popoutProps.selectedSort = popoutProps.selectedSort || this.getPopoutValue(this.settings.choices.defaultSort || sortKeys[0], "sort");
						popoutProps.selectedOrder = popoutProps.selectedOrder || this.getPopoutValue(this.settings.choices.defaultOrder || orderKeys[0], "order");
						popoutProps.searchKey = popoutProps.searchKey || "";
						return BDFDB.ReactUtils.createElement(NotesPopoutComponent, {}, true);
					}
				}));
			}
			
			getPopoutValue (key, type) {
				return {
					label: type == "order" ? BDFDB.LanguageUtils.LibraryStrings[key] : this.labels[`popout_${type}_${key}`],
					value: key
				};
			}

			addMessageToNotes (message, channel) {
				if (!message) return;
				channel = channel || BDFDB.LibraryStores.ChannelStore.getChannel(message.channel_id);
				let guild_id = channel.guild_id || BDFDB.DiscordConstants.ME;
				notes[guild_id] = notes[guild_id] || {};
				notes[guild_id][channel.id] = notes[guild_id][channel.id] || {}
				if (!notes[guild_id][channel.id][message.id]) {
					notes[guild_id][channel.id][message.id] = {
						addedat: new Date().getTime(),
						channel: JSON.stringify(channel),
						id: message.id,
						message: JSON.stringify(message),
						timestamp: message.timestamp._i.getTime()
					};
					BDFDB.DataUtils.save(notes, this, "notes");
					BDFDB.NotificationUtils.toast(this.labels.toast_noteadd, {type: "success"});
				}
				else this.removeNoteData(notes[guild_id][channel.id][message.id]);
			}
			
			isNoteOutdated (note, message) {
				let noteMessage = note && JSON.parse(note.message), keys = ["content", "embeds", "attachment"];
				return noteMessage && !BDFDB.equals(BDFDB.ObjectUtils.extract(noteMessage, keys), BDFDB.ObjectUtils.extract(message, keys));
			}

			getNoteData (message, channel) {
				if (!message) return;
				channel = channel || BDFDB.LibraryStores.ChannelStore.getChannel(message.channel_id);
				let guild_id = channel.guild_id || BDFDB.DiscordConstants.ME;
				return notes[guild_id] && notes[guild_id][channel.id] && notes[guild_id][channel.id][message.id];
			}

			updateNoteData (note, newMessage) {
				let message = JSON.parse(note.message);
				let channel = JSON.parse(note.channel);
				if (!message || !channel) return;
				let guild_id = channel.guild_id || BDFDB.DiscordConstants.ME;
				notes[guild_id][channel.id][note.id].message = JSON.stringify(newMessage);
				BDFDB.DataUtils.save(notes, this, "notes");
				BDFDB.NotificationUtils.toast(this.labels.toast_noteupdate, {type: "info"});
			}

			removeNoteData (note, noToast = false) {
				let message = JSON.parse(note.message);
				let channel = JSON.parse(note.channel);
				if (!message || !channel) return;
				let guild_id = channel.guild_id || BDFDB.DiscordConstants.ME;
				delete notes[guild_id][channel.id][note.id];
				if (BDFDB.ObjectUtils.isEmpty(notes[guild_id][channel.id])) {
					delete notes[guild_id][channel.id];
					if (BDFDB.ObjectUtils.isEmpty(notes[guild_id])) delete notes[guild_id];
				}
				BDFDB.DataUtils.save(notes, this, "notes");
				if (!noToast) BDFDB.NotificationUtils.toast(this.labels.toast_noteremove, {type: "danger"});
			}


			setLabelsByLanguage () {
				switch (BDFDB.LanguageUtils.getLanguage().id) {
					case "bg":		// Bulgarian
						return {
							context_pinoption:					"???????????????? ??????????????????????",
							context_unpinoption:				"???????????????????? ???? ??????????????????",
							context_updateoption:				"?????????????????? ???? ????????????????????????",
							popout_filter_all:					"???????????? ??????????????",
							popout_filter_channel:				"??????????",
							popout_filter_server:				"????????????",
							popout_note:						"??????????????",
							popout_pinoption:					"??????????????????",
							popout_sort_messagetime:			"???????? ???? ??????????????????????",
							popout_sort_notetime:				"???????? ???? ??????????????",
							toast_noteadd:						"?????????????????????? ?? ???????????????? ?????? ??????????????????",
							toast_noteremove:					"?????????????????????? ?? ???????????????????? ???? ??????????????????",
							toast_noteupdate:					"?????????????????????? ?????????????????????? ?? ??????????????????"
						};
					case "cs":		// Czech
						return {
							context_pinoption:					"Poznamenat zpr??vu",
							context_unpinoption:				"Odebrat pozn??mku",
							context_updateoption:				"Aktualizovat pozn??mku",
							popout_filter_all:					"V??echny servery",
							popout_filter_channel:				"Kan??l",
							popout_filter_server:				"Server",
							popout_note:						"Pozn??mky",
							popout_pinoption:					"Pozn??mka",
							popout_sort_messagetime:			"Datum zpr??vy",
							popout_sort_notetime:				"Datum pozn??mky",
							toast_noteadd:						"Zpr??va p??id??na do pozn??mek",
							toast_noteremove:					"Zpr??va odebr??na z pozn??mek",
							toast_noteupdate:					"Zpr??va v pozn??mk??ch aktualizov??na"
						};
					case "da":		// Danish
						return {
							context_pinoption:					"Skriv beskeden ned",
							context_unpinoption:				"Fjern noten",
							context_updateoption:				"Opdater noten",
							popout_filter_all:					"Alle servere",
							popout_filter_channel:				"Kanal",
							popout_filter_server:				"Server",
							popout_note:						"Noter",
							popout_pinoption:					"Bem??rk",
							popout_sort_messagetime:			"Meddelelsesdato",
							popout_sort_notetime:				"Bem??rkdato",
							toast_noteadd:						"Besked f??jet til notesbog",
							toast_noteremove:					"Besked fjernet fra notesbog",
							toast_noteupdate:					"Opdateret meddelelsen i notesbogen"
						};
					case "de":		// German
						return {
							context_pinoption:					"Nachricht notieren",
							context_unpinoption:				"Notiz entfernen",
							context_updateoption:				"Notiz aktualisieren",
							popout_filter_all:					"Alle Server",
							popout_filter_channel:				"Kanal",
							popout_filter_server:				"Server",
							popout_note:						"Notizen",
							popout_pinoption:					"Notieren",
							popout_sort_messagetime:			"Nachrichtendatum",
							popout_sort_notetime:				"Notizdatum",
							toast_noteadd:						"Nachricht zum Notizbuch hinzugef??gt",
							toast_noteremove:					"Nachricht aus dem Notizbuch entfernt",
							toast_noteupdate:					"Nachricht im Notizbuch aktualisiert"
						};
					case "el":		// Greek
						return {
							context_pinoption:					"???????????? ???? ????????????",
							context_unpinoption:				"?????????????????? ???? ????????????????",
							context_updateoption:				"?????????????????? ???? ????????????????",
							popout_filter_all:					"???????? ???? ??????????????????????",
							popout_filter_channel:				"????????????",
							popout_filter_server:				"????????????????",
							popout_note:						"????????????????????",
							popout_pinoption:					"????????????????",
							popout_sort_messagetime:			"???????????????????? ??????????????????",
							popout_sort_notetime:				"???????????????? ??????????????????????",
							toast_noteadd:						"???? ???????????? ???????????????????? ?????? ??????????????????????????",
							toast_noteremove:					"???? ???????????? ?????????????????????? ?????? ???? ??????????????????????????",
							toast_noteupdate:					"?????????????????????? ???? ???????????? ?????? ??????????????????????????"
						};
					case "es":		// Spanish
						return {
							context_pinoption:					"Escribe el mensaje",
							context_unpinoption:				"Eliminar la nota",
							context_updateoption:				"Actualiza la nota",
							popout_filter_all:					"Todos los servidores",
							popout_filter_channel:				"Canal",
							popout_filter_server:				"Servidor",
							popout_note:						"Notas",
							popout_pinoption:					"Nota",
							popout_sort_messagetime:			"Fecha del mensaje",
							popout_sort_notetime:				"Fecha della nota",
							toast_noteadd:						"Mensaje agregado al cuaderno",
							toast_noteremove:					"Mensaje eliminado de la libreta",
							toast_noteupdate:					"Se actualiz?? el mensaje en el cuaderno."
						};
					case "fi":		// Finnish
						return {
							context_pinoption:					"Kirjoita viesti muistiin",
							context_unpinoption:				"Poista muistiinpano",
							context_updateoption:				"P??ivit?? muistiinpano",
							popout_filter_all:					"Kaikki palvelimet",
							popout_filter_channel:				"Kanava",
							popout_filter_server:				"Palvelin",
							popout_note:						"Muistiinpanoja",
							popout_pinoption:					"Merkint??",
							popout_sort_messagetime:			"Viestin p??iv??m????r??",
							popout_sort_notetime:				"Muistiinpanon p??iv??m????r??",
							toast_noteadd:						"Viesti lis??ttiin muistikirjaan",
							toast_noteremove:					"Viesti poistettu muistikirjasta",
							toast_noteupdate:					"P??ivitetty muistikirjan viesti"
						};
					case "fr":		// French
						return {
							context_pinoption:					"Noter le message",
							context_unpinoption:				"Supprimer la note",
							context_updateoption:				"Mettre ?? jour la note",
							popout_filter_all:					"Tous les serveurs",
							popout_filter_channel:				"Salon",
							popout_filter_server:				"Serveur",
							popout_note:						"Notes",
							popout_pinoption:					"Note",
							popout_sort_messagetime:			"Date du message",
							popout_sort_notetime:				"Date de la note",
							toast_noteadd:						"Message ajout?? au carnet",
							toast_noteremove:					"Message supprim?? du carnet",
							toast_noteupdate:					"Mise ?? jour du message dans le carnet"
						};
					case "hi":		// Hindi
						return {
							context_pinoption:					"????????? ???????????????",
							context_unpinoption:				"????????? ???????????????",
							context_updateoption:				"?????????????????? ?????????",
							popout_filter_all:					"????????? ???????????????",
							popout_filter_channel:				"????????????",
							popout_filter_server:				"???????????????",
							popout_note:						"??????????????????????????????",
							popout_pinoption:					"??????????????? ?????????",
							popout_sort_messagetime:			"??????????????? ??????????????????",
							popout_sort_notetime:				"????????? ??????????????????",
							toast_noteadd:						"??????????????? ?????????????????? ????????? ??????????????? ?????????",
							toast_noteremove:					"?????????????????? ?????? ??????????????? ??????????????? ?????????",
							toast_noteupdate:					"?????????????????? ????????? ??????????????? ??????????????? ???????????? ?????????"
						};
					case "hr":		// Croatian
						return {
							context_pinoption:					"Zapi??ite poruku",
							context_unpinoption:				"Izbri??i bilje??ku",
							context_updateoption:				"A??urirajte bilje??ku",
							popout_filter_all:					"Svi poslu??itelji",
							popout_filter_channel:				"Kanal",
							popout_filter_server:				"Poslu??itelju",
							popout_note:						"Bilje??ke",
							popout_pinoption:					"Bilje??ka",
							popout_sort_messagetime:			"Datum poruke",
							popout_sort_notetime:				"Datum bilje??ke",
							toast_noteadd:						"Poruka dodana u bilje??nicu",
							toast_noteremove:					"Poruka uklonjena iz bilje??nice",
							toast_noteupdate:					"A??urirana je poruka u bilje??nici"
						};
					case "hu":		// Hungarian
						return {
							context_pinoption:					"??rja le az ??zenetet",
							context_unpinoption:				"T??r??lje a jegyzetet",
							context_updateoption:				"Friss??tse a jegyzetet",
							popout_filter_all:					"Minden szerver",
							popout_filter_channel:				"Csatorna",
							popout_filter_server:				"Szerver",
							popout_note:						"Jegyzetek",
							popout_pinoption:					"Jegyzet",
							popout_sort_messagetime:			"??zenet d??tuma",
							popout_sort_notetime:				"Jegyzet d??tuma",
							toast_noteadd:						"??zenet hozz??adva a jegyzetf??zethez",
							toast_noteremove:					"??zenet elt??vol??tva a jegyzetf??zetb??l",
							toast_noteupdate:					"Friss??tette az ??zenetet a jegyzetf??zetben"
						};
					case "it":		// Italian
						return {
							context_pinoption:					"Annota il messaggio",
							context_unpinoption:				"Elimina la nota",
							context_updateoption:				"Aggiorna la nota",
							popout_filter_all:					"Tutti i server",
							popout_filter_channel:				"Canale",
							popout_filter_server:				"Server",
							popout_note:						"Appunti",
							popout_pinoption:					"Nota",
							popout_sort_messagetime:			"Messaggio data",
							popout_sort_notetime:				"Nota data",
							toast_noteadd:						"Messaggio aggiunto al taccuino",
							toast_noteremove:					"Messaggio rimosso dal taccuino",
							toast_noteupdate:					"Aggiornato il messaggio nel taccuino"
						};
					case "ja":		// Japanese
						return {
							context_pinoption:					"????????????????????????????????????",
							context_unpinoption:				"????????????????????????",
							context_updateoption:				"?????????????????????",
							popout_filter_all:					"????????????????????????",
							popout_filter_channel:				"????????????",
							popout_filter_server:				"?????????",
							popout_note:						"?????????",
							popout_pinoption:					"??????",
							popout_sort_messagetime:			"????????????????????????",
							popout_sort_notetime:				"?????????",
							toast_noteadd:						"?????????????????????????????????????????????",
							toast_noteremove:					"???????????????????????????????????????????????????????????????",
							toast_noteupdate:					"?????????????????????????????????????????????????????????"
						};
					case "ko":		// Korean
						return {
							context_pinoption:					"???????????? ??????",
							context_unpinoption:				"?????? ??????",
							context_updateoption:				"?????? ????????????",
							popout_filter_all:					"?????? ??????",
							popout_filter_channel:				"??????",
							popout_filter_server:				"????????? ??????",
							popout_note:						"??????",
							popout_pinoption:					"??????",
							popout_sort_messagetime:			"????????? ??????",
							popout_sort_notetime:				"?????? ??????",
							toast_noteadd:						"???????????? ?????? ??? ?????????",
							toast_noteremove:					"??????????????? ???????????? ?????????????????????.",
							toast_noteupdate:					"???????????? ???????????? ????????????????????????."
						};
					case "lt":		// Lithuanian
						return {
							context_pinoption:					"U??ra??ykite ??inut??",
							context_unpinoption:				"I??trinkite u??ra????",
							context_updateoption:				"Atnaujinkite u??ra????",
							popout_filter_all:					"Visi serveriai",
							popout_filter_channel:				"Kanal??",
							popout_filter_server:				"Serverio",
							popout_note:						"Pastabos",
							popout_pinoption:					"Pastaba",
							popout_sort_messagetime:			"Prane??imo data",
							popout_sort_notetime:				"U??ra??o data",
							toast_noteadd:						"Prane??imas prid??tas prie u??ra???? knygel??s",
							toast_noteremove:					"Prane??imas pa??alintas i?? u??ra???? knygel??s",
							toast_noteupdate:					"Atnaujino prane??im?? u??ra???? knygut??je"
						};
					case "nl":		// Dutch
						return {
							context_pinoption:					"Schrijf het bericht op",
							context_unpinoption:				"Verwijder de notitie",
							context_updateoption:				"Werk de notitie bij",
							popout_filter_all:					"Alle servers",
							popout_filter_channel:				"Kanaal",
							popout_filter_server:				"Server",
							popout_note:						"Notities",
							popout_pinoption:					"Notitie",
							popout_sort_messagetime:			"Datum bericht",
							popout_sort_notetime:				"Datum notitie",
							toast_noteadd:						"Bericht toegevoegd aan notitieblok",
							toast_noteremove:					"Bericht verwijderd uit notitieblok",
							toast_noteupdate:					"Het bericht in het notitieblok bijgewerkt"
						};
					case "no":		// Norwegian
						return {
							context_pinoption:					"Skriv ned meldingen",
							context_unpinoption:				"Slett notatet",
							context_updateoption:				"Oppdater notatet",
							popout_filter_all:					"Alle servere",
							popout_filter_channel:				"Kanal",
							popout_filter_server:				"Server",
							popout_note:						"Notater",
							popout_pinoption:					"Merk",
							popout_sort_messagetime:			"Meldingsdato",
							popout_sort_notetime:				"Merkdato",
							toast_noteadd:						"Melding lagt til notatbok",
							toast_noteremove:					"Melding fjernet fra notatblokken",
							toast_noteupdate:					"Oppdaterte meldingen i notatboken"
						};
					case "pl":		// Polish
						return {
							context_pinoption:					"Zapisz wiadomo????",
							context_unpinoption:				"Usu?? notatk??",
							context_updateoption:				"Zaktualizuj notatk??",
							popout_filter_all:					"Wszystkie serwery",
							popout_filter_channel:				"Kana??",
							popout_filter_server:				"Serwer",
							popout_note:						"Notatki",
							popout_pinoption:					"Uwaga",
							popout_sort_messagetime:			"Data wiadomo??ci",
							popout_sort_notetime:				"Data notatki",
							toast_noteadd:						"Wiadomo???? dodana do notatnika",
							toast_noteremove:					"Wiadomo???? zosta??a usuni??ta z notatnika",
							toast_noteupdate:					"Zaktualizowano wiadomo???? w notatniku"
						};
					case "pt-BR":	// Portuguese (Brazil)
						return {
							context_pinoption:					"Anotar mensagem",
							context_unpinoption:				"Desanotar mensagem",
							context_updateoption:				"Atualizar nota",
							popout_filter_all:					"Todos os servidores",
							popout_filter_channel:				"Canal",
							popout_filter_server:				"Servidor",
							popout_note:						"Notas",
							popout_pinoption:					"Nota",
							popout_sort_messagetime:			"Data da mensagem",
							popout_sort_notetime:				"Data da nota",
							toast_noteadd:						"Mensagem adicionada ao caderno",
							toast_noteremove:					"Mensagem removida do caderno",
							toast_noteupdate:					"Atualizou a mensagem no caderno"
						};
					case "ro":		// Romanian
						return {
							context_pinoption:					"Noteaz?? mesajul",
							context_unpinoption:				"??terge??i nota",
							context_updateoption:				"Actualiza??i nota",
							popout_filter_all:					"Toate serverele",
							popout_filter_channel:				"Canal",
							popout_filter_server:				"Server",
							popout_note:						"Note",
							popout_pinoption:					"Not??",
							popout_sort_messagetime:			"Mesajului data",
							popout_sort_notetime:				"Nota??i data",
							toast_noteadd:						"Mesaj ad??ugat ??n caiet",
							toast_noteremove:					"Mesaj eliminat din caiet",
							toast_noteupdate:					"Am actualizat mesajul din caiet"
						};
					case "ru":		// Russian
						return {
							context_pinoption:					"?????????????????? ??????????????????",
							context_unpinoption:				"?????????????? ???? ??????????????????????",
							context_updateoption:				"???????????????? ?? ??????????????????????",
							popout_filter_all:					"?????? ??????????????",
							popout_filter_channel:				"??????????",
							popout_filter_server:				"????????????",
							popout_note:						"?????????????????????? ??????????????????",
							popout_pinoption:					"????????????",
							popout_sort_messagetime:			"???????? ????????????????",
							popout_sort_notetime:				"???????? ????????????????????",
							toast_noteadd:						"?????????????????? ??????????????????",
							toast_noteremove:					"?????????????????? ?????????????? ???? ??????????????????????",
							toast_noteupdate:					"?????????????????? ?????????????????? ?? ??????????????????????"
						};
					case "sv":		// Swedish
						return {
							context_pinoption:					"Skriv ner meddelandet",
							context_unpinoption:				"Radera anteckningen",
							context_updateoption:				"Uppdatera anteckningen",
							popout_filter_all:					"Alla servrar",
							popout_filter_channel:				"Kanal",
							popout_filter_server:				"Server",
							popout_note:						"Anteckningar",
							popout_pinoption:					"Notera",
							popout_sort_messagetime:			"Meddelandedatum",
							popout_sort_notetime:				"Noteradatum",
							toast_noteadd:						"Meddelande tillagt anteckningsbok",
							toast_noteremove:					"Meddelandet har tagits bort fr??n anteckningsboken",
							toast_noteupdate:					"Uppdaterat meddelandet i anteckningsboken"
						};
					case "th":		// Thai
						return {
							context_pinoption:					"???????????????????????????",
							context_unpinoption:				"????????????????????????",
							context_updateoption:				"????????????????????????????????????",
							popout_filter_all:					"??????????????????????????????????????????????????????",
							popout_filter_channel:				"????????????",
							popout_filter_server:				"?????????????????????????????????",
							popout_note:						"????????????????????????",
							popout_pinoption:					"??????????????????",
							popout_sort_messagetime:			"????????????????????????????????????????????????",
							popout_sort_notetime:				"??????????????????????????????????????????",
							toast_noteadd:						"????????????????????????????????????????????????????????????????????????????????????",
							toast_noteremove:					"????????????????????????????????????????????????????????????????????????????????????",
							toast_noteupdate:					"???????????????????????????????????????????????????????????????????????????"
						};
					case "tr":		// Turkish
						return {
							context_pinoption:					"Mesaj?? yaz??n",
							context_unpinoption:				"Notu silin",
							context_updateoption:				"Notu g??ncelleyin",
							popout_filter_all:					"T??m sunucular",
							popout_filter_channel:				"Kanal",
							popout_filter_server:				"Sunucu",
							popout_note:						"Notlar",
							popout_pinoption:					"Not",
							popout_sort_messagetime:			"Mesaj tarihi",
							popout_sort_notetime:				"Not tarihi",
							toast_noteadd:						"Not defterine mesaj eklendi",
							toast_noteremove:					"Mesaj not defterinden kald??r??ld??",
							toast_noteupdate:					"Defterdeki mesaj g??ncellendi"
						};
					case "uk":		// Ukrainian
						return {
							context_pinoption:					"???????????????? ????????????????????????",
							context_unpinoption:				"???????????????? ??????????????",
							context_updateoption:				"?????????????? ??????????????",
							popout_filter_all:					"?????? ??????????????",
							popout_filter_channel:				"????????????",
							popout_filter_server:				"????????????",
							popout_note:						"??????????????",
							popout_pinoption:					"????????????????",
							popout_sort_messagetime:			"???????? ????????????????????????",
							popout_sort_notetime:				"???????? ????????????????",
							toast_noteadd:						"???????????????????????? ???????????? ???? ????????????????",
							toast_noteremove:					"???????????????????????? ???????????????? ?? ????????????????",
							toast_noteupdate:					"???????????????? ???????????????????????? ?? ????????????????"
						};
					case "vi":		// Vietnamese
						return {
							context_pinoption:					"Vi???t l???i tin nh???n",
							context_unpinoption:				"X??a ghi ch??",
							context_updateoption:				"C???p nh???t ghi ch??",
							popout_filter_all:					"T???t c??? c??c m??y ch???",
							popout_filter_channel:				"K??nh",
							popout_filter_server:				"Ng?????i ph???c v???",
							popout_note:						"Ghi ch??",
							popout_pinoption:					"Ghi ch??",
							popout_sort_messagetime:			"Ng??y nh???n tin",
							popout_sort_notetime:				"Ghi ch?? ng??y",
							toast_noteadd:						"???? th??m tin nh???n v??o s??? tay",
							toast_noteremove:					"???? x??a tin nh???n kh???i s??? ghi ch??p",
							toast_noteupdate:					"???? c???p nh???t tin nh???n trong s??? tay"
						};
					case "zh-CN":	// Chinese (China)
						return {
							context_pinoption:					"????????????",
							context_unpinoption:				"????????????",
							context_updateoption:				"????????????",
							popout_filter_all:					"???????????????",
							popout_filter_channel:				"??????",
							popout_filter_server:				"?????????",
							popout_note:						"??????",
							popout_pinoption:					"??????",
							popout_sort_messagetime:			"????????????",
							popout_sort_notetime:				"????????????",
							toast_noteadd:						"???????????????????????????",
							toast_noteremove:					"??????????????????????????????",
							toast_noteupdate:					"??????????????????????????????"
						};
					case "zh-TW":	// Chinese (Taiwan)
						return {
							context_pinoption:					"????????????",
							context_unpinoption:				"????????????",
							context_updateoption:				"????????????",
							popout_filter_all:					"???????????????",
							popout_filter_channel:				"??????",
							popout_filter_server:				"?????????",
							popout_note:						"??????",
							popout_pinoption:					"??????",
							popout_sort_messagetime:			"????????????",
							popout_sort_notetime:				"????????????",
							toast_noteadd:						"???????????????????????????",
							toast_noteremove:					"??????????????????????????????",
							toast_noteupdate:					"??????????????????????????????"
						};
					default:		// English
						return {
							context_pinoption:					"Note Message",
							context_unpinoption:				"Remove Note",
							context_updateoption:				"Update Note",
							popout_filter_all:					"All Servers",
							popout_filter_channel:				"Channel",
							popout_filter_server:				"Server",
							popout_note:						"Notes",
							popout_pinoption:					"Note",
							popout_sort_messagetime:			"Message Date",
							popout_sort_notetime:				"Note Date",
							toast_noteadd:						"Message added to Notebook",
							toast_noteremove:					"Message removed from Notebook",
							toast_noteupdate:					"Updated the Message in the Notebook"
						};
				}
			}
		};
	})(window.BDFDB_Global.PluginUtils.buildPlugin(changeLog));
})();