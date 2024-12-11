/**
 * Set default inventory for guest mode
 * @param inventory
 * @returns {{setDefaultInventory: setDefaultInventory}}
 */
export default function useGuestMode(inventory) {

    function setDefaultInventory() {
        inventory.push(
            {id: 1, icon: "air.png", name: "Air"},
            {id: 2, icon: "flame.png", name: "Fire"},
            {id: 3, icon: "dirt.png", name: "Earth"},
            {id: 4, icon: "water.png", name: "Water"},
        );
    }

    return {
        setDefaultInventory,
    }

}

