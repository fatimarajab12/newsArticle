import axios from 'axios';
import { isValidUrl } from './checkURL';
const input = document.getElementById('URI');

async function handleSubmit(e) {
    e.preventDefault();
    const form = document.querySelector('form');

    if (!isValidUrl(input.value)) {
        showError();
        document.getElementById('error').innerHTML = 'Please, Enter a valid URL';
        input.value = '';
        return;
    }

    loading(true);
    try {
        const { data } = await axios.post('http://localhost:8000/', { URI: input.value }, {
            headers: { 'Content-Type': 'application/json' }
        });
        displayResults(data);
    } catch (error) {
        showError();
        document.getElementById('error').innerHTML = 'An error occurred. Please try again.';
    }
}

const displayResults = data => {
    loading(false);
    if (data.msg) {
        showError();
        showResults(false);
        document.getElementById('error').innerHTML = `${data.msg}`;
        return;
    }
    hideError();
    showResults(true);

    document.getElementById('agreement').innerHTML = `Agreement: ${data.sample.agreement}`;
    document.getElementById('subjectivity').innerHTML = `Subjectivity: ${data.sample.subjectivity}`;
    document.getElementById('confidence').innerHTML = `Confidence: ${data.sample.confidence}`;
    document.getElementById('irony').innerHTML = `Irony: ${data.sample.irony}`;
    document.getElementById('score_tag').innerHTML = `Score Tag: ${data.sample.score_tag}`;
}

const loading = (bool) => {
    const loader = document.getElementById('loader');
    loader.style.display = bool ? 'block' : 'none';
}

const showResults = (bool) => {
    document.querySelectorAll('ul li').forEach(element => {
        element.style.display = bool ? 'block' : 'none';
    });
}

const showError = () => document.getElementById('error').style.display = 'block';
const hideError = () => document.getElementById('error').style.display = 'none';

export { handleSubmit };
