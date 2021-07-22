function State(initialState) {
    let state = initialState

    let stateAPI = {
        /**
         *
         * @param {any | () => any} value
         */
        setState: function setState(value) {
            if (typeof value === 'function') {
                state = value(state)
            } else {
                state = value
            }
        },
        getState: function getState() {
            return state
        },
    }

    return stateAPI
}
