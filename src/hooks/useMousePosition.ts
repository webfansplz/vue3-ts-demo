import { reactive, onMounted, onUnmounted, toRefs } from "vue";
interface PositionReactive {
  x: number;
  y: number;
}
export default function useMousePosition() {
  const position: PositionReactive = reactive<PositionReactive>({
    x: 0,
    y: 0,
  });
  function getPosition(e: MouseEvent) {
    position.x = e.pageX;
    position.y = e.pageY;
  }
  onMounted(() => {
    window.addEventListener("mousemove", getPosition);
  });
  onUnmounted(() => {
    window.removeEventListener("mousemove", getPosition);
  });

  //  toRefs将reactive对象转换为普通对象，其中结果对象上的每个属性都是指向原始对象中相应属性的ref引用对象，这在组合函数返回响应式状态时非常有用，这样保证了开发者使用对象解构或拓展运算符不会丢失原有响应式对象的响应。
  return toRefs<PositionReactive>(position);
}
