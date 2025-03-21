<template>
    <div class="battle-hud">
        <p>Você encontrou um espírito elemental!</p>
        <button @click="attack">Atacar</button>
        <button @click="defend">Defender</button>
        <button @click="run">Fugir</button>
    </div>
</template>

<script>
export default {
    name: 'battle-hud',
    methods: {
        attack() {
            // Lógica para atacar
            console.log('Atacar')
        },
        defend() {
            // Lógica para defender
            console.log('Defender')
        },
        run() {
            // Lógica para fugir
            console.log('Fugir')
            this.$emit('close-battle-hud')
        }
    }
}
</script>

<style scoped>
.battle-hud {
    width: 100%;
    padding: 10px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
}
</style>