


const scriptsInEvents = {

	async Ecarshop_Event77_Act2(runtime, localVars)
	{
// Define function mappings for better maintainability
const functionMapping = [{name: 'tokenMaxMints'}, {name: 'walletMintsOf'}]

// Example data for max mints
const tokenMaxMints =
    runtime.objects.JSON.getFirstInstance().getJsonDataCopy().tokensMaxMints // Example: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]

// Validate the length of `tokenMaxMints` to avoid out-of-bounds issues
if (tokenMaxMints?.length < functionMapping.length) {
    console.warn(
        'Mismatch between tokenMaxMints length and functionMapping length.',
    )
}

// Iterate over function mappings and update the instances
functionMapping.forEach((fn, index) => {
    // Ensure we don't exceed the bounds of the tokenMaxMints array
    if (index >= tokenMaxMints.length) {
        console.warn(`Index ${index} is out of bounds for tokenMaxMints.`)
        return
    }
    // Update text for ShopMaxMintsText instances when the name matches 'tokenMaxMints'
    if (fn.name === 'tokenMaxMints') {
        runtime.globalVars[`MaxMintsC${runtime.globalVars.ShopItemSelected}`] =
            tokenMaxMints[index] > 0 ? tokenMaxMints[index] : 99999
    } else {
        const currentCarId = fn.carId
        const tokenMaxMintsIndex = functionMapping.findIndex(
            fn => fn.name === 'tokenMaxMints' && fn.carId === currentCarId,
        )
        const currentMaxMints =
            tokenMaxMints[tokenMaxMintsIndex] > 0
                ? tokenMaxMints[tokenMaxMintsIndex]
                : 9999
        const currentlyMinted = tokenMaxMints[index]

        runtime.globalVars[
            `AvailableMintsC${runtime.globalVars.ShopItemSelected}`
        ] = currentMaxMints - currentlyMinted
    }
})
	},

	async Ecarshop_Event81_Act1(runtime, localVars)
	{
		const processedCarName = runtime.globalVars.processedCarName
		
		runtime.callFunction("onCarHasMinted", processedCarName)
	},

	async Ecarshop_Event90_Act1(runtime, localVars)
	{
// Define ship mappings for better maintainability
const shipMappings = [
    {name: 'Smallvagen', id: 1},
    {name: 'Cleo', id: 2},
    {name: 'Pastel', id: 3},
    {name: 'R-Cdes', id: 4},
    {name: 'Hyper', id: 5},
    {name: 'Andogini', id: 6},
    {name: 'Turbo GT9', id: 7},
]
const DEFAULT_CAR_NAME = 'Rusty'
const DEFAULT_CAR_ID = 0

const userNftBalances =
    runtime.objects.JSON.getFirstInstance().getJsonDataCopy().userNfts // Example response: [1, 1, 0]

// Enrich the NFT data with ship information
const enrichedNfts = userNftBalances.map((balance, index) => ({
    ...shipMappings[index],
    balance: Number(balance),
}))

// Function to update button and availability
const updateCarInfo = nft => {
    runtime.globalVars[`UnlockedCar${nft.id}`] = nft.balance > 0 ? 1 : 0
}

// Update each NFT's info based on selection and balance
;[
    ...enrichedNfts,
    {name: DEFAULT_CAR_NAME, id: DEFAULT_CAR_ID, balance: 1},
].forEach(updateCarInfo)
	},

	async Emainmenu_Event26_Act1(runtime, localVars)
	{
		const DEFAULT_CAR_NAME = 'Rusty'
		const nftTokensMappings = [
		    {name: 'Smallvagen', type: 'car'}, // Token ID: 1
		    {name: 'Cleo', type: 'car'}, // Token ID: 2
		    {name: 'Pastel', type: 'car'}, // Token ID: 3
		    {name: 'R-Cedes', type: 'car'}, // Token ID: 4
		    {name: 'Hyper', type: 'car'}, // Token ID: 5
		    {name: 'Andogini', type: 'car'}, // Token ID: 6
		    {name: 'Turbo GT9', type: 'car'}, // Token ID: 7
		]
		
		const selectedCar = runtime.globalVars.ShopItemSelected
		const userNftBalances =
		    runtime.objects.JSON.getFirstInstance().getJsonDataCopy().userNfts // Example response: [1, 1, 0, 0, 1]
		
		const userNftsWithBalance = nftTokensMappings.map((data, index) => ({
		    ...data,
		    balance: Number(userNftBalances[index]),
		}))
		
		if (selectedCar !== 'Rusty') {
		    const shouldSwitchCarToDefault = userNftsWithBalance.some(
		        nft => nft.name === selectedCar && nft.balance === 0,
		    )
		
		    if (shouldSwitchCarToDefault) {
		        runtime.globalVars.ShopItemSelected = DEFAULT_CAR_NAME
		        await runtime.storage.setItem('selectedCar', DEFAULT_CAR_NAME)
		    }
		}
	},

	async Efriends_Event3_Act3(runtime, localVars)
	{
		// Pobierz tekst z obiektu FriendsCode
		var textToCopy = runtime.objects.FriendsCode.getFirstInstance().text;
		
		// Utwórz ukryty element textarea
		var tempInput = document.createElement("textarea");
		tempInput.value = textToCopy;
		
		// Dodaj element do dokumentu
		document.body.appendChild(tempInput);
		
		// Zaznacz tekst
		tempInput.select();
		tempInput.setSelectionRange(0, 99999); // Dla wsparcia na urządzeniach mobilnych
		
		// Skopiuj tekst do schowka
		document.execCommand("copy");
		
		// Usuń element textarea
		document.body.removeChild(tempInput);
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

