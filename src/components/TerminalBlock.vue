<script>
export default {
  name: 'TerminalBlock',
  props: {
    title: {
      type: String,
      default: 'user@portfolio:~',
    },
  },
};
</script>

<template>
  <div class="terminal-window backdrop-blur-md bg-glass-darker border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/20 hover:shadow-custom-blue-500/20">
    <!-- Terminal Header -->
    <div class="terminal-header flex items-center px-4 py-3 bg-white/5 border-b border-white/5">
      <div class="flex gap-2 mr-4">
        <div class="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
        <div class="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
      </div>
      <div class="flex-1 text-center text-xs font-mono text-gray-400 opacity-60">
        {{ title }}
      </div>
      <div class="w-12"></div> <!-- Spacer for centering -->
    </div>

    <!-- Terminal Body -->
    <div class="terminal-body p-6 font-mono text-sm md:text-base text-gray-300 leading-relaxed">
      <slot></slot>
      <div class="mt-4 animate-pulse inline-block w-2.5 h-4 bg-custom-blue-400 align-middle"></div>
    </div>
  </div>
</template>

<style scoped>
.terminal-window {
  transform: perspective(1000px) rotateX(0deg);
  will-change: transform;
}
</style>
