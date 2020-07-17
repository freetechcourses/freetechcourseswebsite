// Getting all keywords and course details from backend
window.onload = async () => {
  try {
    // Getting keywords
    const keywordResponse = await (
      await fetch(`${url}/course/keywords`, { method: 'GET' })
    ).json();

    const keywords = await keywordResponse.allKeywords.sort();

    $(document).ready(function () {
      $('.sel').chosen({ width: '100%' });
    });

    // Add keywords to multi-select option
    let keywordSelector = document.querySelector('#search-courses');
    for (let i = 0; i < keywords.length; i++) {
      let option = document.createElement('option');
      option.value = keywords[i];
      option.innerHTML = keywords[i];
      keywordSelector.appendChild(option);
      keywordSelector.style = null;
    }

    // Getting courses
    const courseResponse = await (
      await fetch(`${url}/course/latest`, { method: 'GET' })
    ).json();

    console.log(courseResponse);

    async function* viewMore() {
      for (let i = 1; i <= courseResponse.total / 6; i++) {
        const response = await (
          await fetch(`${url}/course/latest?page=${i}`, { method: 'GET' })
        ).json();

        yield response.data;
      }
    }

    let viewMoreCourses = viewMore();

    document.getElementById('view-more').addEventListener('click', async () => {
      console.log(await viewMoreCourses.next());
      !(await viewMoreCourses.value)
        ? (document.querySelector('#view-more').style.display = 'none')
        : null;
    });
  } catch (err) {}
};
