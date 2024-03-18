const expandablebuttons = ['xpsedge', '5782xps', 'connectionsxps', 'connections', 'connections5782xps', 'encoderconfiguration', 'decoderconfiguration', 'enc_out', 'dec_in', 'firmware', 'control', 'config', 'homepage', 'getting_started']
let originalContent = null;

function scrollToSection(sectionId) {
    restoreContent();
    var element = document.getElementById(sectionId);
    element.scrollIntoView({
        behavior: 'instant',
        block: 'start'
    });

    if (expandablebuttons.includes(sectionId)) {
        const button = document.querySelector(`button[onclick="scrollToSection('${sectionId}')"] .arrow-container`);

        if (button) {
            button.classList.toggle('expanded');
        }
        toggleButtons(sectionId + 'buttons');
    }
}

function restoreContent() {
    if (originalContent) {
        document.querySelector('.main-container').innerHTML = originalContent;
        originalContent = null;
    }
}

function showToc() {
    document.getElementsByTagName('*').classList.remove('highlight')
    var tocExists = document.getElementById('toc');
    if (tocExists) {
        return;
    }
    originalContent = document.querySelector('.main-container').innerHTML;
    // Fetch TOC content
    fetch('toc.html')
        .then(response => response.text())
        .then(html => {

            // document.querySelector('.main-container').innerHTML = html;
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = html;

            // Find the div with class "new"
            const newDiv = tempContainer.querySelector('.new');
            console.log(newDiv)
            const mainContainer = document.getElementsByClassName('main-container');

            mainContainer[0].innerHTML = newDiv.innerHTML


        })
        .catch(error => console.error('Error loading table of contents:', error));
}

// function highlightButtonForVisibleSection() {

//     var mainContainerDivs = document.querySelectorAll('.main-container .new div[id]')
//     mainContainerDivs.forEach(function (div) {
//         var divid = div.getAttribute("id");
//         const expandableButton = document.querySelector(`button[onclick="scrollToSection('${divid}')"] .arrow-container`);

//         var button = document.getElementById(divid + "_button");
//         if (button) {
//             console.log(div)
//             // Check if any child of the div is in the viewport
//             var children = div.getElementsByTagName('*');
//             console.log(children)
//             var inViewport = false;

//             for (var i = 0; i < children.length; i++) {
//                 if (isInViewport(children[i])) {
//                     inViewport = true;
//                     break;
//                 }
//             }
//             if (inViewport) {
//                 // Add highlight if any child is in the viewport
//                 button.classList.add("highlight");
//                 // if (expandableButton) {
//                 //     expandableButton.classList.add('expanded');
//                 //     toggleButtons(divid+'buttons',true);
//                 // }
//             } else {
//                 button.classList.remove('highlight');
//                 // if (expandableButton) {
//                 //     expandableButton.classList.remove('expanded');
//                 //     toggleButtons(divid+'buttons', false)
//                 // }
//             }

//         }

//     })

// }

// document.addEventListener("scroll", function () {
//     // Call the function to highlight the button for the visible section
//     highlightButtonForVisibleSection();
// });

// Call the function initially to highlight the button for the visible section
// highlightButtonForVisibleSection();
// Define options for the IntersectionObserver
// const options = {
//   threshold: 0.5 // Specifies the threshold at which the callback should be triggered (50% visibility)
// };

// Define the callback function
// function handleIntersection(entries, observer) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       // If the element is intersecting with the viewport
//       const sectionId = entry.target.getAttribute('id');
//       const button = document.querySelector(`button[onclick="scrollToSection('${sectionId}')"] .arrow-container`);
//       if (button) {
//         button.classList.add('expanded');
//         toggleButtons(sectionId + 'buttons', true);
//       }
//     } else {
//       // If the element is not intersecting with the viewport
//       const sectionId = entry.target.getAttribute('id');
//       const button = document.querySelector(`button[onclick="scrollToSection('${sectionId}')"] .arrow-container`);
//       if (button) {
//         button.classList.remove('expanded');
//         toggleButtons(sectionId + 'buttons', false);
//       }
//     }
//   });
// }

// // Create a new IntersectionObserver
// const observer = new IntersectionObserver(handleIntersection, options);

// // Get all elements to observe
// const mainContainerDivs = document.querySelectorAll('.main-container .new div[id]');

// // Start observing each element
// mainContainerDivs.forEach(div => {
//   observer.observe(div);
// });


function toggleButtons(buttonsId) {
    var buttonsContainer = document.getElementById(buttonsId)
    if (buttonsContainer.style.display === 'none') {
        buttonsContainer.style.display = 'block';
    } else {
        buttonsContainer.style.display = 'none';
    }
}

function toggleNew(buttonsId, check) {
    console.log("Checking buttons: "+buttonsId+" "+ check)
    
    var buttonsContainer = document.getElementById(buttonsId);

    if (buttonsContainer) {
        if (check) {
            buttonsContainer.style.display = 'block';
        } else {
            buttonsContainer.style.display = 'none';
        }
    }
}


function expandAll(button) {
    // Select all expandable sections
    var expandables = document.querySelectorAll('.expandable');
    var expanded = false;
    // Loop through each expandable section and expand it
    expandables.forEach(function (expandable) {
        expandable.nextElementSibling.style.display = 'block'; // Display the content
        var arrow = expandable.querySelector('.arrow-container');
        if (arrow) {
            arrow.classList.add('expanded'); // Add expanded class to arrow
            expanded = true
        }
    });



}


function collapseAll(button) {
    // Select all expandable sections
    var expandables = document.querySelectorAll('.expandable');
    // Loop through each expandable section and coll= apse it
    expandables.forEach(function (expandable) {
        expandable.nextElementSibling.style.display = 'none'; // Hide the content
        var arrow = expandable.querySelector('.arrow-container');
        if (arrow) {
            arrow.classList.remove('expanded'); // Remove expanded class from arrow
            expanded = false;
        }
    });
    if (!expanded) {
        document.querySelector('#expandButton').classList.remove('highlight')
    }

}

// function isInViewport(el) {
//     var rect = el.getBoundingClientRect(),
//         vWidth = window.innerWidth || document.documentElement.clientWidth,
//         vHeight = window.innerHeight || document.documentElement.clientHeight;

//     // Calculate the area of the element
//     var elementArea = (rect.right - rect.left) * (rect.bottom - rect.top);

//     // Calculate the intersection area between the element and the viewport
//     var intersectionArea = Math.max(0, Math.min(rect.right, vWidth) - Math.max(rect.left, 0)) *
//         Math.max(0, Math.min(rect.bottom, vHeight) - Math.max(rect.top, 0));

//     // Calculate the percentage of the element's area that is visible in the viewport
//     var visiblePercentage = (intersectionArea / elementArea) * 100;

//     // Return true if the visible percentage is greater than or equal to 50%
//     return visiblePercentage >= 60;
// }


const mainContainer = document.querySelector('.main-container')
const sections = document.querySelectorAll('.main-container .new div[id]')
var expandables = document.querySelectorAll('.expandable');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const sectionID = entry.target.id;
        if (entry.isIntersecting) {
            console.log('currently on' + sectionID)
        }
        const buttonID = sectionID + '_button';
        const button = document.getElementById(buttonID);
        if (button) {
            const expButton = document.querySelector(`button[onclick="scrollToSection('${sectionID}')"] .arrow-container`);
            button.classList.toggle('highlight', entry.isIntersecting)
            
            if (expButton) {
                toggleNew(sectionID +'buttons', entry.isIntersecting);
                expButton.classList.toggle('expanded',entry.isIntersecting)
            }
        }
    })
},{
    threshold: 0.01,
    rootMargin: '-100px'
});

sections.forEach(section => {
    observer.observe(section)
})
