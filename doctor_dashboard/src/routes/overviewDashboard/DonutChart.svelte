<script lang="ts">
	import { Card, Chart } from 'flowbite-svelte';
	import options from './traffic';
	
	

	export let dark: boolean = false;
</script>

<Card size="xl" class="h-fit">
	
	<Chart options={options(dark)}></Chart>
	<div class="mb-4 flex  justify-between pt-4 sm:pt-6 lg:justify-evenly">
		<div class="flex items-center">
			<span class="dot"></span>
			<span class="text-sm font-medium text-gray-700 dark:text-gray-400">High Risk</span>
		</div>
		<div class="flex items-center">
			<span class="dot dot-2"></span>
			<span class="text-sm font-medium text-gray-700 dark:text-gray-400">Medium Risk</span>
			<span class="dot-2"></span>
		</div>
		<div class="flex items-center">
			<span class="dot dot-3"></span>
			<span class="text-sm font-medium text-gray-700 dark:text-gray-400">Low Risk</span>
		</div>
	</div>
</Card>

<style>
	.dot {
		height: 25px;
		width: 25px;
		border-radius: 50%;
		display: inline-block;
		margin-right: 10px;
		background-color: #FF5F57;
	}
	.dot-2 {
		background-color: #FDBC2C;
	}
	.dot-3 {
		background-color: #28C840;
	}
</style>
