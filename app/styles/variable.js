/**
 * 全局 css 变量名
 */
export default {
  /**
   * 主色系
   */
  $main_color_white: '#FFFFFF',
  $main_color_black: '#000000',
  $main_color_primary: '#409EFF',
  $main_color_primary_light_1: '#53a8ff',
  $main_color_primary_light_2: '#66b1ff',
  $main_color_primary_light_3: '#79bbff',
  $main_color_primary_light_4: '#8cc5ff',
  $main_color_primary_light_5: '#a0cfff',
  $main_color_primary_light_6: '#b3d8ff',
  $main_color_primary_light_7: '#c6e2ff',
  $main_color_primary_light_8: '#d9ecff',
  $main_color_primary_light_9: '#ecf5ff',

  /**
   * 辅助色系 - 除了主色外的场景色，需要在不同的场景中使用
   */
  $auxiliary_color_Success: '#67C23A',
  $auxiliary_color_Warning: '#E6A23C',
  $auxiliary_color_Danger: '#F56C6C',
  $auxiliary_color_Info: '#909399',

  /**
   * font - color
   */
  $font_color_medium_black: '#2C2C2C',
  $font_color_primary: '#303133',
  $font_color_regular_light: '#3c3c3c',
  $font_color_regular: '#606266',
  $font_color_secondary: '#909399',
  $font_color_placeholder: '#C0C4CC',

  /**
   * font - size
   */
  $font_size_extra_large: 20,
  $font_size_large: 18,
  $font_size_medium: 16,
  $font_size_base: 14,
  $font_size_small: 13,
  $font_size_extra_small: 12,

  $font_line_height_primary: 24,
  $font_line_height_secondary: 16,
  $font_weight_primary: 500,
  $font_weight_secondary: 100,

  /**
   * background
   */
  $background_color_base: '#f5f7fa',
  $background_color_milky_white: 'rgba(255,255,255,1)',

  /**
   * link
   */
  $link_color: '#66b1ff',
  $link_hover_color: '#409EFF',

  /**
   * Border
   */
  $border_color_base: '#DCDFE6',
  $border_color_light: '#E4E7ED',
  $border_color_lighter: '#EBEEF5',
  $border_color_extra_light: 'rgba(238,238,238,1)',

  $border_width_base: 1,
  $border_style_base: 'solid',
  $border_hover_color: '#C0C4CC',

  $border_radius_small: 2,
  $border_radius_base: 4,
  $border_radius_circle: '100%',

  /**
   * box - shadow
   */
  $ios_box_shadow_base: {
    shadowColor: 'rgba(0, 0, 0, .12)',
    shadowOffset: {height: 2, width: 4},
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  $ios_box_shadow_dark: {
    shadowColor: 'rgba(0, 0, 0, .42)',
    shadowOffset: {height: 2, width: 4},
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  $ios_box_shadow_light: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {height: 2, width: 12},
    shadowOpacity: 1,
    shadowRadius: 0,
  },

  $ios_box_shadow_light_1: {
    shadowColor: 'rgba(191,206,221,0.3)',
    shadowOffset: {height: 0, width: 1},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  $ios_box_shadow_book: {
    shadowColor: 'rgba(117,127,136,0.3)',
    shadowOffset: {height: 0, width: 2},
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  $ios_box_shadow_bottom: {
    shadowColor: '#72879B',
    shadowOffset: {height: 0, width: -1},
    shadowOpacity: 1,
    shadowRadius: 6,
  },

  /**
   * z-index
   */
  $zIndex_normal: 1,
  $zIndex_header: 2000,
  $zIndex_loading: 3000,

  /**
   * Transition
   * 暂时不好写
   */
  $fade_in_transition: () => {},
};
