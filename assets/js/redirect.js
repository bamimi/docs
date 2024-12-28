document.addEventListener('DOMContentLoaded', function () {
	const spinner = document.getElementById('spinner');

	function redirectVersion() {
		const dataUrl = `assets/data/versions.json`;

		fetch(dataUrl)
			.then(async (response) => {
				console.log("Loading version")
				if (response.ok) {

					return response.json();
				} else {
					throw new Error('Version not found');
				}
			})
			.then(versions => {
				const latestVersion = versions.find(versions => versions.latest === true)

				if (latestVersion) {
					const currentUrlParams = new URLSearchParams(window.location.search);

					const newUrl = new URL(`/docs/${latestVersion.version}`, window.location.origin);
					newUrl.search = currentUrlParams.toString();

					window.location.href = newUrl.toString();
				}
			})
			.catch(error => {
				console.error(error)
			})
			.finally(() => {
				console.log("Load version done")
			});
	}

	redirectVersion()
})