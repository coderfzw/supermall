<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
};
</script>

<style>

.tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-color: #f6f6f6;
  box-shadow: 0 -1px 3px rgba(100, 100, 100, 0.2);
}
</style>