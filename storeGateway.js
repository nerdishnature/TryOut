export class StoreGateway {
    getStoreData(identifier) {
        const storedValue = localStorage.getItem(identifier);
        return storedValue;
    }

    setStoredValue(identifier, value){
        localStorage.setItem(identifier, value);
    }
}