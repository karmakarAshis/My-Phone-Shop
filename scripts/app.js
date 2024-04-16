const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones);
}

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12) {
        showAllContainer.classList = '';
    } else {
        showAllContainer.classList.add('hidden')
    }
    phones = phones.slice(0, 12);
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card card-compact bg-base-100 pt-8 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
                            alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingDots(false)
}
const handleSearchBtn = () => {
    toggleLoadingDots(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
}

const toggleLoadingDots = (isLoading) => {
    const loadingDots = document.getElementById('loading-dots');
    if(isLoading){
        loadingDots.classList.remove('hidden')
    }else{
        loadingDots.classList.add('hidden');
    }
}


// loadPhone(searchText);