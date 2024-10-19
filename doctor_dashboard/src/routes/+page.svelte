<script>
    let id = '';

    function handleSubmit(event) {
        event.preventDefault();
        if (id.length === 10 && !isNaN(id)) {
            const baseUrl = window.location.origin;
            window.location.href = `${baseUrl}/doctorDashboard/${id}`;
        } else {
            alert("Please enter a valid 10-digit ID.");
        }
    }
</script>

<div class="container">
    <div class="login-card">
        <div class="header">
            <h1>Doctor Dashboard</h1>
            <p class="subtitle">Enter your credentials to access the system</p>
        </div>

        <form on:submit={handleSubmit} class="login-form">
            <div class="input-group">
                <label for="id-input">Doctor ID</label>
                <input 
                    id="id-input" 
                    type="text" 
                    bind:value={id} 
                    maxlength="10" 
                    placeholder="Enter your 10-digit ID"
                    pattern="\d{10}"
                    title="Please enter a valid 10-digit ID"
                    required 
                />
                <span class="hint">Please enter your 10-digit identification number</span>
            </div>

            <button type="submit">
                Access Dashboard
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </button>
        </form>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
        min-height: 100vh;
    }

    .container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }

    .login-card {
        background: white;
        padding: 2.5rem;
        border-radius: 1rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                    0 2px 4px -1px rgba(0, 0, 0, 0.06);
        width: 100%;
        max-width: 400px;
    }

    .header {
        text-align: center;
        margin-bottom: 2rem;
    }

    h1 {
        color: #1a365d;
        font-size: 1.875rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
    }

    .subtitle {
        color: #4a5568;
        font-size: 0.975rem;
        margin: 0;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    label {
        color: #2d3748;
        font-size: 0.875rem;
        font-weight: 500;
    }

    input {
        padding: 0.75rem 1rem;
        border: 2px solid #e2e8f0;
        border-radius: 0.5rem;
        font-size: 1rem;
        transition: border-color 0.15s ease;
        width: 100%;
    }

    input:focus {
        outline: none;
        border-color: #3182ce;
        box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
    }

    .hint {
        color: #718096;
        font-size: 0.75rem;
    }

    button {
        background: #3182ce;
        color: white;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    button:hover {
        background: #2c5282;
    }

    button:active {
        transform: translateY(1px);
    }

    button svg {
        transition: transform 0.2s ease;
    }

    button:hover svg {
        transform: translateX(4px);
    }

    @media (max-width: 480px) {
        .login-card {
            padding: 1.5rem;
        }

        h1 {
            font-size: 1.5rem;
        }
    }
</style>