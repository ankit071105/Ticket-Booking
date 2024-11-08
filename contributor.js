const repoOwner = "ankit071105";
const repoName = "Ticket-Booking";
const contributorsUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;
const repoUrl = `https://api.github.com/repos/${repoOwner}/${repoName}`;

async function fetchAllContributors(url) {
  let contributors = [];
  let page = 1;
  let perPage = 100; // Max per page is 100

  while (true) {
    const response = await fetch(`${url}?per_page=${perPage}&page=${page}`);
    const data = await response.json();

    if (data.length === 0) {
      break;
    }

    contributors = contributors.concat(data);
    page++;
  }

  return contributors;
}

async function fetchContributorData() {
  try {
    const [contributors, repoData] = await Promise.all([
      fetchAllContributors(contributorsUrl),
      fetch(repoUrl).then(res => res.json())
    ]);

    const statsGrid = document.getElementById("statsGrid");

    statsGrid.innerHTML = `
      <div class="contributor-stat-card"><h3>${contributors.length}</h3><p>Contributors</p></div>
      <div class="contributor-stat-card"><h3>${contributors.reduce((sum, { contributions }) => sum + contributions, 0)}</h3><p>Total Contributions</p></div>
      <div class="contributor-stat-card"><h3>${repoData.stargazers_count}</h3><p>GitHub Stars</p></div>
      <div class="contributor-stat-card"><h3>${repoData.forks_count}</h3><p>Forks</p></div>
    `;

    const contributorsContainer = document.getElementById("contributors");
    contributorsContainer.innerHTML = contributors.map(({ login, contributions, avatar_url, html_url }) => `
      <div class="contributor-card">
        <img src="${avatar_url}" alt="${login}'s avatar">
        <p><strong>${login}</strong></p>
        <p>Contributions: ${contributions}</p>
        <a href="${html_url}" target="_blank">GitHub Profile</a>
      </div>
    `).join('');
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchContributorData();
