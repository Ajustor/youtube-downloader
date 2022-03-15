<script lang="ts">
  // your script goes here
  export let element
</script>

<li>
  {element.name}
  <div class="w-full bg-gray-200 rounded-full">
    <div
      class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
      style="width: {element.progress}%"
    >
      {element.progress}%
    </div>
  </div>
</li>
