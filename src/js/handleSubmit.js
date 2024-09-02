import axios from 'axios';
import { isValidUrl } from './checkURL';

const input = document.getElementById('URI');
const errorElement = document.getElementById('error');
const agreementElement = document.getElementById('agreement');
const subjectivityElement = document.getElementById('subjectivity');
const confidenceElement = document.getElementById('confidence');
const ironyElement = document.getElementById('irony');
const scoreTagElement = document.getElementById('score_tag');
const loader = document.getElementById('loader');

async function handleSubmit(e) {
    e.preventDefault();
    const form = document.querySelector('form');

    if (!isValidUrl(input.value)) {
        displayError('Please, Enter a valid URL');
        input.value = '';
        return;
    }

    toggleLoading(true);
    try {
        const { data } = await axios.post('http://localhost:8000/', { URI: input.value }, {
            headers: { 'Content-Type': 'application/json' }
        });
        displayResults(data);
    } catch (error) {
        displayError('An error occurred. Please try again.');
    }
}

const displayResults = (data) => {
    toggleLoading(false);
    if (!data || data.msg) {
        displayError(data?.msg || 'Unexpected response from the server.');
        showResults(false);
        return;
    }
    hideError();
    showResults(true);

    agreementElement.innerHTML = `Agreement: ${data.sample.agreement}`;
    subjectivityElement.innerHTML = `Subjectivity: ${data.sample.subjectivity}`;
    confidenceElement.innerHTML = `Confidence: ${data.sample.confidence}`;
    ironyElement.innerHTML = `Irony: ${data.sample.irony}`;
    scoreTagElement.innerHTML = `Score Tag: ${data.sample.score_tag}`;
}

const toggleLoading = (isLoading) => {
    loader.style.display = isLoading ? 'block' : 'none';
}

const showResults = (shouldShow) => {
    document.querySelectorAll('ul li').forEach(element => {
        element.style.display = shouldShow ? 'block' : 'none';
    });
}

const displayError = (message) => {
    errorElement.innerHTML = message;
    errorElement.style.display = 'block';
}

const hideError = () => errorElement.style.display = 'none';

export { handleSubmit };
