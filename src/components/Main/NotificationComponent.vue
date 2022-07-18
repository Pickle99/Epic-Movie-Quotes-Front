<template>
  <div class="absolute mt-10"><img src="@/assets/icons/triangle.svg" alt="svg"/></div>
  <div class="p-7 text-white text-xl w-[60rem] bg-black absolute mt-16 -ml-96 ">
    <div class="flex justify-between items-center mb-7">
      <h1 class="text-2xl font-bold">Notifications</h1>
      <p class="underline text-sm">Mark as all read</p>
    </div>
    <NotificationFromComponent/>
    <NotificationFromComponent/>
    <NotificationFromComponent/>
    <NotificationFromComponent/>
  </div>
</template>


<script>
import NotificationFromComponent from '@/components/Main/NotificationFromComponent.vue'
export default {
  components: {
    NotificationFromComponent
  }
}
</script>

