<template>
  <div id="app">
  <v-simple-table>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical>

        </v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">

          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">New Item</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                    v-model="editedItem.name"
                    label="Dessert name">
                    </v-text-field>
                    </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                    v-model="editedItem.calories"                   
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                    v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                     v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                    v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="close" color="blue darken-1" text>
                Cancel
              </v-btn>
              <v-btn @click="addItem(item)" color="blue darken-1" text>
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="editDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit Item</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                    v-model="editedItem.name"
                    label="Dessert name">
                    </v-text-field>
                    </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                    v-model="editedItem.calories"                   
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                    v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                     v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                    v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="close" color="blue darken-1" text >Cancel
              </v-btn>
              <v-btn @click="updateItem(item)" color="blue darken-1" text >Update
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>  
    <template>
      <thead>
        <tr>
          <th class="text-left">
            Dessert (100g serving)
          </th>
          <th class="text-left">
            Calories
          </th>
          <th class="text-left">
            Fat (g)
          </th>
          <th class="text-left">
            Carbs (g)
          </th>
          <th class="text-left">
            Protein (g)
          </th>
          <th class="text-left">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item) in Product"
          :key="item.id"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
          <td>{{ item.fat }}</td>
          <td>{{ item.carbs }}</td>
          <td>{{ item.protein }}</td>
          <td> <v-icon small @click="editItem(item)" class="mr-2">
            mdi-pencil
            </v-icon>
            <v-icon small @click="removeItemConfirm(item.id)">
              mdi-delete
            </v-icon>
          </td>
        
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex';

export default {
  name:'productList',
  data(){
    return{
      // product,
      editedIndex: -1,

      dialog: false,
      editDialog: false,
      
      editedItem:{
        name:'',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }
  },
  

  computed:{
    ...mapGetters(["Product"]),
  },
  
  methods:{
    ...mapActions(["getProduct", "removeItemConfirm"]),
    
    addItem(){
      debugger; // eslint-disable-line no-debugger
      this.$store.dispatch('addItem', this.editedItem )
      this.close()
    },
   
    editItem(item){
      debugger; // eslint-disable-line no-debugger
      this.editDialog = true
      this.editedIndex = this.Product.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },

    updateItem(){
      const params = {
        editedItem = this.editedItem,
        editedIndex = this.editedIndex
      }
      debugger; // eslint-disable-line no-debugger
      this.$store.dispatch('updateItem', params)
      this.close()
    },
    close () {
      this.editedItem = this.defaultItem
        this.dialog = false
        this.editDialog = false
      },
  },
  mounted(){
    this.getProduct();
  },
}

</script>