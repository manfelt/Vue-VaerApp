<template>
    <div class="vind-retning">
    </div>
</template>

<script>
export default {
	name: 'vind-retning',
    data() {
        
    },
    methods: {

       skaffHimmelretning(vinkel) {

         // 8 himmelretninger
          const graderPrRetning = 360 / 8;

            // Trigonometri
          const utjevnetVinkel = vinkel + graderPrRetning / 2;

          return (utjevnetVinkel >= 0 * graderPrRetning && utjevnetVinkel < 1 * graderPrRetning) ? "N"
            : (utjevnetVinkel >= 1 * graderPrRetning && utjevnetVinkel < 2 * graderPrRetning) ? "NØ"
              : (utjevnetVinkel >= 2 * graderPrRetning && utjevnetVinkel < 3 * graderPrRetning) ? "Ø"
                : (utjevnetVinkel >= 3 * graderPrRetning && utjevnetVinkel < 4 * graderPrRetning) ? "SØ"
                  : (utjevnetVinkel >= 4 * graderPrRetning && utjevnetVinkel < 5 * graderPrRetning) ? "S"
                    : (utjevnetVinkel >= 5 * graderPrRetning && utjevnetVinkel < 6 * graderPrRetning) ? "SV"
                      : (utjevnetVinkel >= 6 * graderPrRetning && utjevnetVinkel < 7 * graderPrRetning) ? "V"
                        : "NV";
        }
    }
}
</script>
