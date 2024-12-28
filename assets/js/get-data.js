
async function getContent(version, content) {
	const dataUrl = `/docs/${version}/assets/data/contents/${content}.html`;
	const data = await fetch(dataUrl)
	if (data.ok) {
		return data.text();
	}
}

async function updateURL(content) {
	const url = new URL(window.location);
	url.searchParams.set('content', content);
	history.pushState(null, '', url);
}
