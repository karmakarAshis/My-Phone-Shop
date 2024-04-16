const loadPhone = async (searchText = 's', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll);
}

const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden')
    }
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card card-compact bg-base-100 pt-8 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
                            alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-center">
                            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingDots(false)
}

const handleShowDetails = async (id) => {
    console.log('show details clicked', id);

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showphoneDetails(phone);
}


const showphoneDetails = (phone) => {
    console.log(phone);
    const showDetailsPhnName = document.getElementById('show-details-phone-name');
    showDetailsPhnName.innerText = phone.name;
    const ShowDetailsPhoneContainer = document.getElementById('phone-details-container');
    ShowDetailsPhoneContainer.innerHTML = `
            <div class="p-8">
                <img src="${phone.image}" alt="${phone.name}">
            </div>
            <h3><strong>Storage:</strong> ${phone?.mainFeatures?.storage}</h3>
            <h3><strong>Display Size:</strong> ${phone?.mainFeatures?.displaySize}</h3>
            <h3><strong>Chipset:</strong> ${phone?.mainFeatures?.chipSet}</h3>
            <h3><strong>Memory:</strong> ${phone?.mainFeatures?.memory}</h3>
            <h3><strong>GPS:</strong> ${phone?.others?.GPS || 'No GPS available'}</h3>
            <h3><strong>Release Date:</strong> ${phone?.releaseDate}</h3>
            <h3><strong>Brand:</strong> ${phone?.brand}</h3>
    
    `
    show_details_modal.showModal();
}

const handleSearch = (isShowAll) => {
    toggleLoadingDots(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}

const toggleLoadingDots = (isLoading) => {
    const loadingDots = document.getElementById('loading-dots');
    if (isLoading) {
        loadingDots.classList.remove('hidden')
    } else {
        loadingDots.classList.add('hidden');
    }
}
const handleShowAll = () => {
    handleSearch(true);
}

loadPhone();