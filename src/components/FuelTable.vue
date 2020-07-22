<template>
  <div class="flag-status-wrap" style="width:100%">

    <table>
      <thead>
        <tr>
          <td width="6.66%">lap</td>
          <td width="6.66%">session</td>
          <td width="6.66%">driver</td>
          <td width="6.66%">flag</td>
          <td width="6.66%">laptime</td>
          <td width="6.66%">fuel used</td>
          <td width="6.66%">fuel in tank</td>
          <td width="6.66%">laps in tank</td>
          <td width="6.66%">time in tank</td>
          <td width="6.66%">time needed</td>
          <td width="6.66%">fuel needed</td>
          <td width="6.66%">fuel to end</td>
          <td width="6.66%">fuel to full</td>
          <td width="6.66%">pit+fuel end</td>
          <td width="6.66%">pit+fuel full</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in 200" :key="x">
          <td width="6.66%">1</td>
          <td width="6.66%">123</td>
          <td width="6.66%">2314</td>
          <td width="6.66%">2314</td>
          <td width="6.66%">2314</td>
          <td width="6.66%">2314</td>
          <td width="6.66%">2314</td>
          <td width="6.66%">2314</td>
          <td width="6.66%">2314</td>
          <td width="6.66%">2314</td>
          <td width="6.66%">541</td>
          <td width="6.66%">541</td>
          <td width="6.66%">541</td>
          <td width="6.66%">541</td>
          <td width="6.66%">541</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'FuelTable',
  props: {
  },
  computed: {

  }
}
</script>

<style scoped>

  .flag-status-wrap {
    font-size: 11px;
    margin: 10px 10px;
    font-family: Consolas;
    user-select: none;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  td {
    padding: 1px 5px;
    text-align: right;
  }

  td:not(:last-child) {
    border-right: 1px solid #e3e3e3;
  }

  thead td {
    background-color: rgb(116, 116, 116) !important;
    text-align: center !important;
    color: white
  }

  tr:nth-child(odd) {
    background-color: #e3e3e3;
  }

  /* STICKY THEAD */


  thead {
    display: block; /* to take the same width as tr */
    position: absolute;
    left: 10px;
    right: 17px; /* - 17px because of the scrollbar width */
    position: absolute;
  }

  thead td {
    height: 40px !important;
  }

  tbody {
    display: block; /* to enable vertical scrolling */
    position: absolute;
    bottom: 0px;
    top: 50px;
    left: 10px;
    right: 0px;
    overflow-y: scroll; /* keeps the scrollbar even if it doesn't need it; display purpose */
  }

  tr {
    display: table; /* display purpose; th's border */
    width: 100%;
  }
</style>
