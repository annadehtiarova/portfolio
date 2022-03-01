
const itemTableau = document.querySelectorAll('.item-tableau')
const navLink = document.querySelectorAll('span');

navLink.forEach((link) => {
    link.addEventListener('mouseenter', () => {
        link.style.backgroundColor = 'black';
        link.style.color = 'white';
        link.style.padding = '5px 10px';
})
    link.addEventListener('mouseout', () => {
        link.style.backgroundColor = '#f9f9f9';
        link.style.color = 'black';
})
})

itemTableau.forEach((item) => {
    item.addEventListener('mouseenter', () => {
        const classItem = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];

        for ( let i =0; i < classItem.length; i++) {
        if (item.classList.contains(classItem[i])) {
            navLink.forEach((link) => {
                if(link.classList.contains(classItem[i])) {
                    link.style.backgroundColor = 'black';
                    link.style.color = 'white';
                    link.style.padding = '5px 10px';
                } 

            })
        }}

})

    item.addEventListener('mouseout', () => {    
        navLink.forEach((link) => {
            link.style.backgroundColor = '#f9f9f9';
            link.style.color = 'black';
})
})
})
    




