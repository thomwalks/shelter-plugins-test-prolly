const {
	flux: { storesFlat: { ThemeStore, SelectedChannelStore }, dispatcher },
	solid: { onCleanup },
	util: { createSubscription, getFiber, reactFiberWalker },
	observeDom,
	ui: { ReactiveRoot },
} = shelter;

// take links and return iframes!
// async because song.link
const matchers: [
	RegExp,
	(...matches: string[]) => Promise<HTMLIFrameElement | undefined>,
][] = [
	// Apple Music
	[
		/(https?):\/\/music.apple.com\/([a-z]+\/(?:album|playlist)\/.*)/,
		(protocol, path) =>
			Promise.resolve(
				(
					<iframe
						allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
						height={
							path.includes("playlist") ? 450 : path.includes("i=") ? 175 : 450
						}
						style="width:100%;max-width:660px;overflow:hidden;border-radius:10px; border:none;"
						sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
						src={`${protocol}://embed.music.apple.com/${path}`}
					/>
				) as HTMLIFrameElement,
			),
	],

	// Deezer track
	[
		/(https?):\/\/(?:www.)?deezer.com\/[a-z]+\/((?:track|album|playlist)\/\d+)/,
		(protocol, path) =>
			Promise.resolve(
				(
					<iframe
						title="deezer-widget"
						src={`${protocol}://widget.deezer.com/widget/${
							(ThemeStore as any).getState().theme
						}/${path}`}
						width="100%"
						height={path.includes("track") ? 150 : 200}
						style="border:none;max-width:660px"
						allow="encrypted-media; clipboard-write"
					/>
				) as HTMLIFrameElement,
			),
	],
	// song.link
	//[], // TODO
	// TIDAL, sadly only albums and playlists
	/*[
		/(https?):\/\/listen.tidal.com\/(album|playlist)\/([a-z0-9-]+)/,
		(protocol, type, id) =>
			Promise.resolve(
				(
					<iframe
						src={`${protocol}://embed.tidal.com/${type}s/${id}?coverInitially=true&disableAnalytics=true`}
						style="width:100%;height:300px;max-width:660px"
					/>
				) as HTMLIFrameElement,
			),
	],*/
];

const TRIGGERS = [
	"MESSAGE_CREATE",
	"MESSAGE_UPDATE",
	"UPDATE_CHANNEL_DIMENSIONS",
];

function handleDispatch(payload: any) {
	if (
		(payload.type === "MESSAGE_CREATE" || payload.type === "MESSAGE_UPDATE") &&
		payload.message.channel_id !== (SelectedChannelStore as any).getChannelId()
	)
		return;

	const unobs = observeDom(
		`[id^="chat-messages-"]:not([data-more-embeds])`,
		async (e) => {
			// mutex
			e.dataset.moreEmbeds = "1";
			unobs();

			const accessories = e.getElementsByTagName(`article`);

			if (accessories[0]) debugger;
			// @ts-expect-error TS is on drugs, HTMLCollection is iterable
			for (const accessory of accessories) {
				const embed = reactFiberWalker(getFiber(accessory), "embed", true)
					?.memoizedProps.embed;
				if (embed?.type !== "link" && embed.type !== "article") return;

				debugger;

				for (const [matcher, handler] of matchers) {
					const match = embed.url.match(matcher);
					if (!match) continue;

					const iframe = await handler(...match.slice(1));
					if (iframe) {
						accessory.style.display = "none";
						accessory.insertAdjacentElement(
							"afterend",
							<ReactiveRoot>{iframe}</ReactiveRoot>,
						);
						break;
					}
				}
			}
		},
	);

	setTimeout(unobs, 100); // dangling
}

for (const t of TRIGGERS) dispatcher.subscribe(t, handleDispatch);

export function onUnload() {
	for (const t of TRIGGERS) dispatcher.unsubscribe(t, handleDispatch);
}
