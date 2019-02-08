<template>
  <div class="map">
    <div class="geo-map" id="map"></div>
  </div>
</template>

<script>
import { fireAuth, db } from "@/firebase/init";
export default {
  name: "GMap",
  data() {
    return {
      lat: 52,
      lng: -2
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });
      db.collection("users")
        .get()
        .then(users => {
          users.forEach(user => {
            if (user.data().geoLocation) {
              const marker = new google.maps.Marker({
                position: {
                  lat: user.data().geoLocation.lat,
                  lng: user.data().geoLocation.lng
                },
                map
              });

              marker.addListener("click", () => {
                this.$router.push(`/profile/${user.id}`);
              });
            }
          });
        });
    }
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
          db.collection("users")
            .where("userId", "==", fireAuth.currentUser.uid)
            .get()
            .then(doc => {
              doc.forEach(d => {
                db.collection("users")
                  .doc(d.id)
                  .update({
                    geoLocation: {
                      lat: pos.coords.latitude,
                      lng: pos.coords.longitude
                    }
                  });
              });
            })
            .then(() => {
              this.renderMap();
            });
        },
        err => {
          this.renderMap();
        },
        { maximumAge: 60000, timeout: 3000 }
      );
    } else {
      this.renderMap();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.geo-map {
  width: 100%;
  height: 100%;
  background: #aaaaaa;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
