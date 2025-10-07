// Simple test to check server connection
import fetch from 'node-fetch';

async function testServer() {
    try {
        console.log('Testing root endpoint...');
        const rootResponse = await fetch('http://127.0.0.1:5000');
        console.log('Root status:', rootResponse.status);
        const rootText = await rootResponse.text();
        console.log('Root response:', rootText);
        
        console.log('\nTesting chat endpoint...');
        const chatResponse = await fetch('http://127.0.0.1:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: 'test' })
        });
        
        console.log('Chat status:', chatResponse.status);
        const chatData = await chatResponse.json();
        console.log('Chat response:', chatData);
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testServer();