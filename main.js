import { eventsStore } from './js/data.js'
import { createDomElement } from './js/utils.js'
import { formatDate } from './js/utils.js'

// Accessing HTML Elements on a Page
const allEventsDiv = document.querySelector('.joinEvents__events-block')
const eventTypeSelect = document.getElementById('event-type')
const eventDistanceSelect = document.getElementById('event-distance')
const eventCategorySelect = document.getElementById('event-category')

// Function for creating event cards
function createEvent(arr) {
    arr.forEach((eventElement) => {
        // Creating a link to an event
        const link = createDomElement({ tag: 'a', className: 'joinEvents__events-card', href: '#' })
        allEventsDiv.append(link)

        // Creating a container for an event image
        const eventImageContainer = createDomElement({ tag: 'div', className: 'joinEvents__image-container' })
        link.append(eventImageContainer)

        // Creating an event image
        const eventImage = createDomElement({ tag: 'img', className: 'joinEvents__image', src: eventElement.image })
        eventImageContainer.append(eventImage)

        // Creating a container for event information
        const eventsDescription = createDomElement({ tag: 'div', className: 'joinEvents__card-info' })
        link.append(eventsDescription)

        // Creating Event Information Elements
        const eventsDate = createDomElement({ tag: 'p', className: 'joinEvents__date', textValue: formatDate(eventElement.date) })
        const eventsHeader = createDomElement({ tag: 'h3', className: 'joinEvents__title', textValue: eventElement.title })
        const eventsCategory = createDomElement({ tag: 'p', className: 'joinEvents__category', textValue: eventElement.category })
        eventsDescription.append(eventsDate, eventsHeader, eventsCategory)

        // If the event is an online event, add the "Online Event" tag
        if (eventElement.type === 'online') {
            const onlineEventLabel = createDomElement({
                tag: 'div',
                className: 'onlineEvent-label',
            });
            const textNode = document.createTextNode('Online Event')
            onlineEventLabel.appendChild(textNode)
            eventImageContainer.insertBefore(onlineEventLabel, eventImageContainer.firstChild)
        }

        // If the number of participants is specified for the event, add information about them
        if (eventElement.attendees) {
            const eventsAtendees = createDomElement({
                tag: 'p',
                className: 'joinEvents__atendees',
                textValue: `${eventElement.attendees} attendees`,
            })
            eventsDescription.append(eventsAtendees)
        }
    })
}

// Function to clear all events
function clearEvents() {
    while (allEventsDiv.firstChild) {
        allEventsDiv.removeChild(allEventsDiv.firstChild)
    }
}

// Function for filtering events and displaying them
function filterEvents(arr) {
// Getting selected filter values
    const selectedType = eventTypeSelect.value !== 'any' && eventTypeSelect.value;
    const selectedDistance = eventDistanceSelect.value !== 'any' && eventDistanceSelect.value;
    const selectedCategory = eventCategorySelect.value !== 'any' && eventCategorySelect.value;

    // Filtering an array of events according to selected parameters
    let filteredArr = arr
    if (selectedType) {
        filteredArr = filteredArr.filter((element) => element.type === selectedType)
    }
    if (selectedDistance) {
        filteredArr = filteredArr.filter((element) => String(element.distance) === selectedDistance)
    }
    if (selectedCategory) {
        filteredArr = filteredArr.filter((element) => element.category === selectedCategory)
    }

    // Clear current events and display filtered events
    clearEvents()
    createEvent(filteredArr)
}

// Adding event handlers to filter elements
eventTypeSelect.addEventListener('change', () => { filterEvents(eventsStore) })
eventDistanceSelect.addEventListener('change', () => { filterEvents(eventsStore) })
eventCategorySelect.addEventListener('change', () => { filterEvents(eventsStore) })

// Display all events when loading a page
createEvent(eventsStore)