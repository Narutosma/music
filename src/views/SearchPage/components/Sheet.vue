<template>
  <div class="search-sheet-container">
    <div class="sheet-wrap-list">
        <MCard v-for="sheet in sheets" :key="sheet.id" :sheet="sheet"/>
    </div>
  </div>
</template>

<script>
import MCard from '@/components/MCard'
export default {
  props: {
    sheets: {
      type: Array,
      required: true
    }
  },
  components: {
    MCard
  }
}
</script>

<style>
.search-sheet-container{
    margin-top: 20px;
}

</style>
