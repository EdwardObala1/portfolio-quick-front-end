function homePage() {
    fetchAPI('http://localhost:8000/api/homepage')
    .then(data => {
        // Use the fetched data
        experiences(data)
        blogs(data)
    })
    .catch(error => {
        // Handle errors
        console.error(error);
    });
}

// fill out the experience section
function experiences(data){
    // get all items via their id
    const jobExperiencesection = document.getElementById("job-experience-section");
    // loop through results and print those out in the html
    console.log(data.blogs)

    data.experiences.forEach(experience => {

        const jobExperienceRow = document.createElement("div");
        jobExperienceRow.id = "job-experience-row";
        jobExperienceRow.className = "row";

        const startDate = new Date(experience.startDate);
        const endDate = new Date(experience.endDate);

        // Format the date
        const options = { year: 'numeric', month: 'short' };
        const formattedStartDate = startDate.toLocaleDateString(undefined, options);
        const formattedEndDate = endDate.toLocaleDateString(undefined, options);

        var remote = ''
        if (experience.remote){
            remote = 'Remote'
        }else{
            remote = 'On-Site'
        }
        jobExperienceRow.innerHTML = `
            <div class="col-12 col-lg-4"">
                <h2 id = 'job-title-text' >${experience.title}</h2>
                <p>${formattedStartDate} - ${formattedEndDate}</p>
                <p>${experience.location}</p>
                <p>${remote}</p>
            </div>
            <div class="col-12 col-lg-8" id = 'job-description'">
                ${experience.description}
            </div>
        `;

        // append to main container holding the data
        jobExperiencesection.appendChild(jobExperienceRow);

    });
}

function blogs(data){
    // get all items via their id
    const blogsPreviewSection = document.getElementById("blogs-preview");
    // loop through results and print those out in the html
    console.log(data.blogs)

    count = 0;
    data.blogs.forEach(blog => {
        count += 1;
        if(count < 4){
            const blogPreviewRow = document.createElement("div");
            blogPreviewRow.id = "blog-preview-row";
            blogPreviewRow.className = "row section-6-inner mx-auto";
            console.log(blog)
            var preview = blog.blog.substring(0, 500)
            blogPreviewRow.innerHTML = `
                <div class="col-lg-6 sec-6-left  pe-0 pe-lg-4">
                    <div class="section-6-heading">
                        <span class="fw-bold">${blog.title}</span>
                    </div>
                    <div class="section-6-para">${preview}...</div>
                    <div class="section-6-button"><a class="sec6-btn text-uppercase fw-bold" onclick="location.href='/blog/${blog.id}'">View Blog</a></div>
                </div>
                <div class="col-lg-6 sec-6-right mt-lg-0 mt-5">
                    <a href="#"><img src="${blog.imageLink}" class="img-fluid sec6-image" alt=""></a>
                </div>
            `;

            // append to main container holding the data
            console.log(blogPreviewRow)
            blogsPreviewSection.appendChild(blogPreviewRow);
        }
    });
}