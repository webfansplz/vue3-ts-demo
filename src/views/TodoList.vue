<template>
  <div>
    <h3>{{ data.message }}</h3>
    <p>{{ data.count }}</p>
    <p>{{ computedCount }}</p>
    <button @click="addCount">++</button>
    <h2>{{ x }}:{{ y }}</h2>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  ComputedRef,
  watchEffect,
  WatchStopHandle,
  watch,
  ref,
  Ref,
} from "vue";
import useMousePosition from "../hooks/useMousePosition";
interface ParentReacive {
  message: string;
  count: number;
}
export default defineComponent({
  // defineComponent 為了更好的類型檢查
  props: {
    message: {
      type: String,
    },
  },
  setup(props) {
    // 响應式reactive典型定義方式
    const data: ParentReacive = reactive<ParentReacive>({
      message: "這是一個parent組件的信息",
      count: 0,
    });
    // 計算屬性的典型定義方式  ComputedRef = 計算屬性類型 範型接口
    const computedCount: ComputedRef<number> = computed<number>(
      () => data.count * 10
    );

    // watchEffect watchEffect 會返回一個暫停監聽的函數
    // watchEffect when I want to watch multiple reactive properties and I don't care about old values
    const stop: WatchStopHandle = watchEffect(() => {
      console.log(data.count);
    });

    // watch的類型定義和使用
    // watch when I want to watch one specific reactive properties and I may want old value
    const stopWatch: WatchStopHandle = watch<number>(
      () => data.count,
      (newCount, oldCount) => {
        console.log(newCount, oldCount);
      }
    );
    // ref的類型定義和使用
    const countRef: Ref<number> = ref<number>(100);
    function addCount() {
      data.count++;
      if (data.count >= 5) {
        stop();
        stopWatch(); // 暫停監聽
      }
    }
    // 使用自定義hooks
    const { x, y } = useMousePosition();

    interface Person {
      info?: PersonInfo;
    }
    interface PersonInfo {
      age?: number;
      weight?: number;
    }
    // const person: Person = {};
    // if(person.info&&person.info.age)
    // console.log(person.info?.age);
    // console.log(null ?? "hello");
    // console.log(0 ?? "hello");
    // console.log(0 || "hello");
    return {
      data,
      computedCount,
      addCount,
      x,
      y,
    };
  },
});
</script>

