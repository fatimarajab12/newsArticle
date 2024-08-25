import { handleSubmit } from './handleSubmit';
// src/js/index.js
import '../styles/styles.scss';
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
});
