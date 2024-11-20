// src/views/BreweryDetailPage.vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ brewery?.name || 'Brewery Details' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="brewery">
      <ion-card class="ion-text-center">
        <img src="../../public/beer-mug.svg" :alt="brewery.name" style="height:300px;"/>
        <ion-card-header>
          <ion-card-title>{{ brewery.name }}</ion-card-title>
          <ion-card-subtitle class="ion-text-capitalize">{{ brewery.brewery_type }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <ion-list>
            <ion-item-group>
              <ion-item-divider>
                <ion-label>Location</ion-label>
              </ion-item-divider>
              
              <ion-item v-if="brewery.street">
                <ion-label>
                  <p>Street</p>
                  <h3>{{ brewery.street }}</h3>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-label>
                  <p>City</p>
                  <h3>{{ brewery.city }}</h3>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-label>
                  <p>State</p>
                  <h3>{{ brewery.state }}</h3>
                </ion-label>
              </ion-item>

              <ion-item v-if="brewery.postal_code">
                <ion-label>
                  <p>Postal Code</p>
                  <h3>{{ brewery.postal_code }}</h3>
                </ion-label>
              </ion-item>
            </ion-item-group>

            <ion-item-group>
              <ion-item-divider>
                <ion-label>Contact</ion-label>
              </ion-item-divider>

              <ion-item v-if="brewery.phone">
                <ion-label>
                  <p>Phone</p>
                  <h3>{{ formatPhone(brewery.phone) }}</h3>
                </ion-label>
                <ion-button slot="end" fill="clear" :href="'tel:' + brewery.phone">
                  <ion-icon :icon="call" slot="icon-only"></ion-icon>
                </ion-button>
              </ion-item>

              <ion-item v-if="brewery.website_url">
                <ion-label>
                  <p>Website</p>
                  <h3>{{ brewery.website_url }}</h3>
                </ion-label>
                <ion-button slot="end" fill="clear" :href="brewery.website_url" target="_blank">
                  <ion-icon :icon="open" slot="icon-only"></ion-icon>
                </ion-button>
              </ion-item>
            </ion-item-group>

            <ion-item-group v-if="brewery.latitude && brewery.longitude">
              <ion-item-divider>
                <ion-label>Location</ion-label>
              </ion-item-divider>

              <ion-item>
                <ion-label>
                  <p>Coordinates</p>
                  <h3>{{ brewery.latitude }}, {{ brewery.longitude }}</h3>
                </ion-label>
                <ion-button slot="end" fill="clear" @click="openMap">
                  <ion-icon :icon="navigate" slot="icon-only"></ion-icon>
                </ion-button>
              </ion-item>
            </ion-item-group>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>

    <!-- Loading State -->
    <ion-content v-else-if="isLoading" class="ion-text-center ion-padding">
      <ion-spinner></ion-spinner>
    </ion-content>

    <!-- Error State -->
    <ion-content v-else class="ion-text-center ion-padding">
      <ion-icon :icon="alertCircle" color="danger" size="large"></ion-icon>
      <p>Failed to load brewery details</p>
      <ion-button fill="clear" @click="loadBrewery">
        Try Again
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonBackButton, IonButtons, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent,
  IonList, IonItem, IonItemDivider, IonItemGroup,
  IonLabel, IonButton, IonIcon, IonSpinner
} from '@ionic/vue';
import { call, open, navigate, alertCircle } from 'ionicons/icons';
import { breweryService, type Brewery } from '@/services/brewery-service';

const route = useRoute();
const brewery = ref<Brewery | null>(null);
const isLoading = ref(true);

function formatPhone(phone: string) {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

function openMap() {
  if (brewery.value?.latitude && brewery.value?.longitude) {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${brewery.value.latitude},${brewery.value.longitude}`,
      '_blank'
    );
  }
}

async function loadBrewery() {
  const id = route.params.id as string;
  isLoading.value = true;

  try {
    brewery.value = await breweryService.getBreweryById(id);
  } catch (error) {
    console.error('Error loading brewery:', error);
    brewery.value = null;
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadBrewery();
});
</script>