<script>
import API from './adapter.js'

export default {
    TildelSted(Sted) {
		this.Sted = Sted;
        API.hentGeoKoordinater(Sted);
        this.refresh();
    },
    refresh() {
        API.hentSamtidsVaerData()
        .then((result) => {
            console.log(result);
        })
    }
}

</script>