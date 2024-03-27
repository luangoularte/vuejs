<script>
import { connect, disconnect, sendName } from "@/websocketutil.js";
import { mapState } from "vuex";
export default {
  name: "Websock",
  data() {
    return {
      disabled: true,
      elname: "",
      allGreetings: [],
    };
  },
  props: {
    msg: String,
  },
  computed: mapState(["greetingMessages"]),
  methods: {
    connectWs() {
      this.disabled = false;
      connect();
    },
    disconnectWs() {
      this.disabled = true;
      disconnect();
    },
    sendGreetingName() {
      console.log(this.elname);
      sendName(this.elname);
      this.elname = "";
    },
  },
};
</script>