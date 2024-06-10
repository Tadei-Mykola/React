export class LocalStorageService {
    getItem(key) {
        return localStorage.getItem(key)
    }

    setArray(key, data, action = 'set') {
        let arr = this.getArray(key) || []

        if (action === 'set') {
            arr.push(data)
        } else if (action === 'change') {
            arr = arr.map(item => item.text == data.text ? data : item)
        } else {
            arr = arr.filter(item => item.text !== data.text)
        }
        localStorage.setItem(key, JSON.stringify(arr))
    }

    getArray(key) {
        return JSON.parse(this.getItem(key))   
    }
}