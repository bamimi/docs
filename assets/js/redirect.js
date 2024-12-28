document.addEventListener('DOMContentLoaded', function () {
	const spinner = document.getElementById('spinner');

	function redirectVersion() {
		const dataUrl = `/assets/data/versions.json`;

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
					window.location.href = `/${latestVersion.version}`;
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