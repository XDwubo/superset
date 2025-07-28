<template>
  <div class="dynamic-component" :style="cssVars" :class="componentClasses">
    <div class="dynamic-component__header">
      <h3>{{ title }}</h3>
    </div>
    <div class="dynamic-component__content">
      <slot></slot>
    </div>
    <div class="dynamic-component__footer" v-if="showFooter">
      <button @click="handleClick">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicComponent',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    primaryColor: {
      type: String,
      default: '#3498db'
    },
    secondaryColor: {
      type: String,
      default: '#2ecc71'
    },
    fontSize: {
      type: Number,
      default: 16
    },
    borderRadius: {
      type: Number,
      default: 8
    },
    spacing: {
      type: Number,
      default: 16
    },
    theme: {
      type: String,
      default: 'light',
      validator: value => ['light', 'dark', 'colorful'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    buttonText: {
      type: String,
      default: '点击'
    }
  },
  computed: {
    cssVars() {
      return {
        '--primary-color': this.primaryColor,
        '--secondary-color': this.secondaryColor,
        '--font-size': this.fontSize + 'px',
        '--border-radius': this.borderRadius + 'px',
        '--spacing': this.spacing + 'px',
        // 计算派生颜色
        '--hover-color': this.lightenColor(this.primaryColor, 10),
        '--text-color': this.theme === 'dark' ? '#ffffff' : '#333333',
        '--background-color': this.theme === 'dark' ? '#2c3e50' : '#ffffff'
      };
    },
    componentClasses() {
      return [
        `dynamic-component--${this.theme}`,
        `dynamic-component--${this.size}`
      ];
    }
  },
  methods: {
    handleClick() {
      this.$emit('button-click');
    },
    lightenColor(color, percent) {
      // 简单的颜色变亮函数
      const num = parseInt(color.replace("#", ""), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) + amt;
      const G = (num >> 8 & 0x00FF) + amt;
      const B = (num & 0x0000FF) + amt;
      return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.dynamic-component {
  // 默认CSS变量值
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --font-size: 16px;
  --border-radius: 8px;
  --spacing: 16px;
  --text-color: #333;
  --background-color: #fff;
  --hover-color: #5dade2;
  
  // 基础样式
  background-color: var(--background-color);
  color: var(--text-color);
  border-radius: var(--border-radius);
  padding: var(--spacing);
  font-size: var(--font-size);
  border: 2px solid var(--primary-color);
  transition: all 0.3s ease;
  
  // 悬停效果
  &:hover {
    border-color: var(--hover-color);
    box-shadow: 0 4px calc(var(--spacing) / 2) rgba(0, 0, 0, 0.1);
  }
  
  // 头部样式
  &__header {
    margin-bottom: var(--spacing);
    border-bottom: 1px solid var(--primary-color);
    padding-bottom: calc(var(--spacing) / 2);
    
    h3 {
      margin: 0;
      color: var(--primary-color);
      font-size: calc(var(--font-size) * 1.2);
    }
  }
  
  // 内容区域
  &__content {
    margin-bottom: var(--spacing);
    line-height: calc(var(--font-size) * 1.5);
  }
  
  // 底部按钮
  &__footer {
    text-align: center;
    
    button {
      background-color: var(--primary-color);
      color: white;
      border: none;
      padding: calc(var(--spacing) / 2) var(--spacing);
      border-radius: calc(var(--border-radius) / 2);
      font-size: var(--font-size);
      cursor: pointer;
      transition: background-color 0.3s ease;
      
      &:hover {
        background-color: var(--hover-color);
      }
      
      &:active {
        transform: translateY(1px);
      }
    }
  }
  
  // 主题变体
  &--dark {
    --text-color: #ecf0f1;
    --background-color: #2c3e50;
    box-shadow: 0 2px calc(var(--spacing) / 2) rgba(0, 0, 0, 0.3);
  }
  
  &--colorful {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    
    .dynamic-component__header {
      border-bottom-color: rgba(255, 255, 255, 0.3);
      
      h3 {
        color: white;
      }
    }
  }
  
  // 尺寸变体
  &--small {
    --font-size: calc(var(--font-size) * 0.875);
    --spacing: calc(var(--spacing) * 0.75);
    --border-radius: calc(var(--border-radius) * 0.75);
  }
  
  &--large {
    --font-size: calc(var(--font-size) * 1.125);
    --spacing: calc(var(--spacing) * 1.25);
    --border-radius: calc(var(--border-radius) * 1.25);
  }
  
  // 响应式设计
  @media (max-width: 768px) {
    --font-size: calc(var(--font-size) * 0.9);
    --spacing: calc(var(--spacing) * 0.8);
  }
  
  @media (max-width: 480px) {
    --font-size: calc(var(--font-size) * 0.8);
    --spacing: calc(var(--spacing) * 0.7);
  }
}
</style>