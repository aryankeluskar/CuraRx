<script lang="ts">
  export let title: string;
  export let value: string;
</script>

<div class="bg-white p-6 rounded-xl shadow-md flex justify-between items-center">
  <div>
    <h2 class="text-sm font-medium text-gray-500 uppercase">{title}</h2>
    <p class="text-4xl font-bold text-gray-800 mt-1">{value}</p>
  </div>
  <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
</div>
