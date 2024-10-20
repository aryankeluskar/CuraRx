<script lang="ts">
  export let value: number;
  
  $: strokeDasharray = `${value * 2.64}, ${264}`;
</script>

<div class="text-center">
  <svg class="w-48 h-48 mx-auto" viewBox="0 0 100 100">
    <circle 
      cx="50" 
      cy="50" 
      r="42" 
      fill="none" 
      stroke="#e6e6e6" 
      stroke-width="10"
    />
    <circle 
      cx="50" 
      cy="50" 
      r="42" 
      fill="none" 
      stroke="#f87171" 
      stroke-width="10"
      stroke-linecap="round"
      transform="rotate(-90 50 50)"
      stroke-dasharray={strokeDasharray}
    />
  </svg>
  <div class="mt-4 text-4xl font-bold text-gray-800">{value}%</div>
</div>
