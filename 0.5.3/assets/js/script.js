document.addEventListener('DOMContentLoaded', function () {
	let clipboard = new ClipboardJS('.copy-button');
	

	clipboard.on('success', function (e) {
		e.trigger.innerHTML = '<i class="fas fa-check"></i>';
		setTimeout(function () {
			e.trigger.innerHTML = '<i class="fas fa-copy"></i>';
		}, 2000);
	});



	clipboard.on('error', function (e) {
		console.error('Copy failed', e);
	});

	const selectContents = document.querySelectorAll('.select-content');
	const contentD = document.getElementById('content');
	const spinner = document.getElementById('spinner');
	spinner.classList.add("d-none")

	const urlParams = new URLSearchParams(window.location.search);
	const contentUrl = urlParams.get('content');

	const sidebarContent = document.getElementById("sidebarContent");
	const openSideBar = document.getElementById("openSideBarContent");
	const closeSideBar = document.getElementById("closeSideBarContent");

	async function selectContent(event) {
		spinner.attributes.display = "block"
		selectContents.forEach(tab => tab.classList.remove('select-active'));

		event.currentTarget.classList.add('select-active');
		spinner.classList.add("d-block")

		const content = event.currentTarget.getAttribute('data-content');
		let contentPath = content.replace("_", "/")
		const data = await getContent("0.5.3", contentPath)

		spinner.classList.remove("d-block")
		spinner.classList.add("d-none")

		if (data) {
			contentD.innerHTML = data;
		} else {
			contentD.innerHTML = "<h5>Data Null</h5>"
		}

		updateURL(content)
		if (window.innerWidth <= 760) {
			closeSideBar.style.display = "none";
			sidebarContent.style.display = "none";
			openSideBar.style.display = "block";
		}
	}

	selectContents.forEach(async (sc) => {
		sc.addEventListener('click', selectContent);
		const dataContent = sc.getAttribute('data-content');
		
		if (dataContent === contentUrl) {
			sc.click()
		}
	});

	if (!contentUrl) {
		selectContents[0].click()
	}

	openSideBar.onclick = function (event) {
		event.currentTarget.style.display = "none";
		closeSideBar.style.display = "block";
		sidebarContent.style.display = "block";
	};

	closeSideBar.onclick = function (event) {
		event.currentTarget.style.display = "none";
		sidebarContent.style.display = "none";
		openSideBar.style.display = "block";
	};
})
