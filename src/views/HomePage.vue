// src/views/HomePage.vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Brewhaus Vue App</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-row>
          <ion-col size="8">
            <ion-searchbar
              v-model="searchTerm"
              @ionInput="handleSearch"
              :debounce="500"
              placeholder="Search breweries..."
            ></ion-searchbar>
          </ion-col>
          <ion-col size="4">
            <ion-select
              v-model="selectedType"
              @ionChange="handleSearch"
              placeholder="Type"
              interface="popover"
            >
              <ion-select-option value="">All Types</ion-select-option>
              <ion-select-option value="micro">Micro</ion-select-option>
              <ion-select-option value="brewpub">Brewpub</ion-select-option>
              <ion-select-option value="large">Large</ion-select-option>
              <ion-select-option value="regional">Regional</ion-select-option>
              <ion-select-option value="contract">Contract</ion-select-option>
            </ion-select>
          </ion-col>
        </ion-row>
      </ion-toolbar>
      <!-- Active Filters -->
      <ion-toolbar v-if="hasFilters">
        <ion-chip v-if="selectedType" outline @click="clearTypeFilter">
          <ion-label>{{ selectedType }}</ion-label>
          <ion-icon :icon="closeCircle"></ion-icon>
        </ion-chip>
        <ion-chip v-if="searchTerm" outline @click="clearSearchTerm">
          <ion-label>"{{ searchTerm }}"</ion-label>
          <ion-icon :icon="closeCircle"></ion-icon>
        </ion-chip>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item 
          v-for="brewery in breweries" 
          :key="brewery.id" 
          :router-link="'/brewery/' + brewery.id"
          detail
        >
          <ion-thumbnail slot="start">
            <img src="../../public/beer-mug.svg" :alt="brewery.name" style="height:fit-content;"/>
          </ion-thumbnail>
          <ion-label>
            <h2>{{ brewery.name }}</h2>
            <p>{{ brewery.city }}, {{ brewery.state }}</p>
            <ion-text class="ion-text-capitalize">
            <p>{{ brewery.brewery_type }}</p>
            </ion-text>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-infinite-scroll @ionInfinite="loadMore">
        <ion-infinite-scroll-content
          loading-spinner="bubbles"
          loading-text="Loading more breweries..."
        ></ion-infinite-scroll-content>
      </ion-infinite-scroll>

      <!-- Empty State -->
      <div v-if="breweries.length === 0" class="ion-text-center ion-padding">
        <ion-icon :icon="beerOutline" size="large"></ion-icon>
        <p>No breweries found</p>
        <ion-button fill="clear" @click="clearAllFilters">
          Clear all filters
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonList, IonItem, IonLabel, IonSelect,
  IonSelectOption, IonInfiniteScroll, IonInfiniteScrollContent,
  IonThumbnail, IonChip, IonIcon, IonButton, IonRow, IonCol
} from '@ionic/vue';
import { closeCircle, beerOutline } from 'ionicons/icons';
import { breweryService, type Brewery } from '@/services/brewery-service';

const breweries = ref<Brewery[]>([]);
const currentPage = ref(1);
const searchTerm = ref('');
const selectedType = ref('');
const isLoading = ref(false);

const hasFilters = computed(() => {
  return Boolean(selectedType.value || searchTerm.value);
});

async function loadBreweries() {
  if (isLoading.value) return;
  isLoading.value = true;

  try {
    let data: Brewery[] = [];

    if (searchTerm.value.length > 2) {
      data = await breweryService.searchBreweries(searchTerm.value, selectedType.value);
    } else if (selectedType.value) {
      data = await breweryService.getBreweries(currentPage.value, 10, selectedType.value);
    } else {
      data = await breweryService.getBreweries(currentPage.value);
    }

    if (currentPage.value === 1) {
      breweries.value = data;
    } else {
      breweries.value = [...breweries.value, ...data];
    }
  } catch (error) {
    console.error('Error fetching breweries:', error);
  } finally {
    isLoading.value = false;
  }
}

function handleSearch() {
  currentPage.value = 1;
  loadBreweries();
}

function clearTypeFilter() {
  selectedType.value = '';
  currentPage.value = 1;
  loadBreweries();
}

function clearSearchTerm() {
  searchTerm.value = '';
  currentPage.value = 1;
  loadBreweries();
}

function clearAllFilters() {
  selectedType.value = '';
  searchTerm.value = '';
  currentPage.value = 1;
  loadBreweries();
}

async function loadMore(ev: CustomEvent) {
  currentPage.value++;
  await loadBreweries();
  (ev.target as HTMLIonInfiniteScrollElement).complete();
}

// Initial load
loadBreweries();
</script>