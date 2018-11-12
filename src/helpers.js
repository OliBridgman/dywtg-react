/**
 * Returns the current date in the format yyyy-dd-mm
 *
 * @param {Number} yearOffset - plus/minus number of years to offset the date by
 * @returns {string}
 */
export function getDateForUrl(yearOffset = 0) {
    const now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1; // January is 0!
    const yyyy = now.getFullYear() + yearOffset;

    // Add leading zeros if day or month is below 10
    if (dd < 10) {
        dd = `0${dd}`;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }

    return `${yyyy}-${mm}-${dd}`;
}

/**
 * Format date ISO string to a human readable string
 *
 * @param {String} date - ISO Date string (e.g. "2018-09-19T02:30:00Z")
 *
 * @returns {String} - Formatted date string (e.g. Wednesday, September 19, 2018, 2:30)
 */
export function formatDateToString(date) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    };
    return new Date(date).toLocaleDateString("en", options);
}

/**
 * Create an element and append a text node
 *
 * @param {String} tagName - Element tag name
 * @param {String} text - Text to be appended to element
 *
 * @returns {Element} - The element to be added to the document
 */
export function createElementWithText(tagName, text) {
    let element = document.createElement(tagName);
    let textNode = document.createTextNode(text);
    element.appendChild(textNode);
    return element;
}

export const createGet = path => object => path.reduce((a, b) => (a && a[b]) ? a[b] : null, object)