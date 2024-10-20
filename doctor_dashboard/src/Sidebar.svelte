<script lang="ts">
  const menuItems = [
    { name: 'Overview', icon: '📊', href: '/overviewDashboard' },
    { name: 'Patients', icon: '👥', href: '/patientsDashboard' },
  ];
  import logo from "./assets/logo-rx.png";
</script>

<aside class="sidebar">
  <div class="sidebar-header">
    <img src={logo} width="50px" height="50px" style="margin-right: 10px;" alt="CureRx Logo">
    <h2>CureRx</h2>
  </div>
  <nav>
    <ul>
      {#each menuItems as item}
        <li>
          <a href={item.href}>
            <span class="icon">{item.icon}</span>
            {item.name}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</aside>

<style>
  .sidebar {
    width: 250px;
    height: 100vh;
    background-color: #ffffff;
    border-right: 1px solid #e2e8f0;
    padding: 2rem 1rem;
  }

  .sidebar-header {
    margin-bottom: 2rem;
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: left;
  }

  .sidebar-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2d3748;
  }

  nav ul {
    list-style-type: none;
    padding: 0;
  }

  nav ul li {
    margin-bottom: 0.5rem;
  }

  nav ul li a {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color: #4a5568;
    text-decoration: none;
    border-radius: 0.375rem;
    transition: background-color 0.2s;
  }

  nav ul li a:hover {
    background-color: #edf2f7;
  }

  .icon {
    margin-right: 0.75rem;
    font-size: 1.25rem;
  }
</style>
