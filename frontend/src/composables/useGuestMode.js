export default function useGuestMode(inventory) {

    function setDefaultInventory() {
        inventory.push(
            {id: 1, icon: "/wind.svg", name: "Air"},
            {id: 2, icon: "/flame.svg", name: "Fire"},
            {id: 3, icon: "/globe.europe.africa.svg", name: "Earth"},
            {id: 4, icon: "/drop.svg", name: "Water"},
        );
    }

    return {
        setDefaultInventory,
    }

}

