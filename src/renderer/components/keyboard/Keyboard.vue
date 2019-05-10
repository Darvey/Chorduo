<template>
	<div class="keyboard">

		<key :note="0"></key>
		<key :note="1" :isDark="true"></key>
		<key :note="2"></key>
		<key :note="3" :isDark="true"></key>
		<key :note="4" :isFull="true"></key>

		<key :note="5"></key>
		<key :note="6" :isDark="true"></key>
		<key :note="7"></key>
		<key :note="8" :isDark="true"></key>
		<key :note="9"></key>
		<key :note="10" :isDark="true"></key>
		<key :note="11" :isFull="true"></key>

		<key :note="12"></key>
		<key :note="13" :isDark="true"></key>
		<key :note="14"></key>
		<key :note="15" :isDark="true"></key>
		<key :note="16" :isFull="true"></key>

		<key :note="17"></key>
		<key :note="18" :isDark="true"></key>
		<key :note="19"></key>
		<key :note="20" :isDark="true"></key>
		<key :note="21"></key>
		<key :note="22" :isDark="true"></key>
		<key :note="23" :isFull="true"></key>

	</div>
</template>

<script>
	import Key from './Key'

	export default {
		name: "keyboard",
		components: {
			Key
		}
	}
</script>

<style lang="scss">
	.keyboard {
		display: flex;
		border-radius: $border-radius;
		width: 530px;
		max-width: 90%;
		height: 150px;
		background-color: $color-light;
		box-shadow: 0 2px 15px rgba(0,0,0,.2);
	}

	.key-text {
		position: absolute;
		bottom: 10px;
		left: 0;
		right: 0;
		text-align: center;
		font-weight: 300;
		font-size: 1.3rem;
	}

</style>