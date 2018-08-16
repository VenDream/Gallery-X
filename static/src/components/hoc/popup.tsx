/**
 * 弹出层高阶组件，对外提供show和hide方法
 * @author VenDream
 * @since 2018-8-15
 */

import React, { Component, Children, cloneElement } from 'react';
import ReactDOM, { createPortal, unmountComponentAtNode } from 'react-dom';
import classnames from 'classnames';

import { getUniqueId } from 'utils/common';

export interface PopUpProps {
  /**
   * 容器元素
   */
  container?: Element;
  /**
   * 过渡效果类
   */
  transitionClass?: string;
  /**
   * 弹出层显示回调
   */
  onShow?: () => void;
  /**
   * 弹出层销毁回调
   */
  onClose?: () => void;
}

/**
 * 返回绑定PopUp能力的组件
 *
 * @export
 * @template WrappedComponentProps 被包裹组件的props
 * @param {React.ComponentType<WrappedComponentProps>} WrappedComponent 被包裹的组件
 * @param {boolean} [singleton=true] 是否单例渲染
 */
export default function popUpFactory<WrappedComponentProps>(
  WrappedComponent: React.ComponentType<WrappedComponentProps>,
  singleton: boolean = true
) {
  return class ComponentWithPopUp extends Component<PopUpProps> {
    static defaultProps: PopUpProps = {
      container: document.body,
      transitionClass: 'zoom-in',
    };

    // 实例映射表
    static instances: Record<string, ComponentWithPopUp> = {};

    /**
     * 显示弹出层，使用React.Portal接口实现
     *
     * @static
     * @param {(WrappedComponentProps & PopUpProps)} [props] 被包裹组件和PopUp容器的联合props
     */
    static show(props?: WrappedComponentProps & PopUpProps) {
      const {
        container,
        transitionClass,
        onShow,
        onClose,
        ...wrappedProps
      } = (props || {}) as Record<string, any>;

      // 单例模式先销毁所有旧实例
      singleton && ComponentWithPopUp.hide();

      // 生成新的实例
      const instanceId = getUniqueId(16);
      const overlay = document.createElement('div');
      const instanceRef: React.RefObject<
        ComponentWithPopUp
      > = React.createRef();

      // 执行渲染操作
      const popupCmp = ReactDOM.render(
        <ComponentWithPopUp
          container={container}
          transitionClass={transitionClass}
          onShow={onShow}
          onClose={onClose}
          ref={instanceRef}
        >
          <WrappedComponent {...wrappedProps} />
        </ComponentWithPopUp>,
        overlay
      ) as ComponentWithPopUp;

      // 加入实例映射表
      setTimeout(() => {
        const instance = instanceRef.current;
        instance.overlay = overlay;
        instance.instanceId = instanceId;
        ComponentWithPopUp.instances[instanceId] = instance;
      }, 0);

      return instanceId;
    }

    /**
     * 关闭弹出层，默认关闭所有实例
     *
     * @static
     * @param {string} [instanceId] 实例ID(可选)
     */
    static hide(instanceId?: string) {
      // 指定关闭一个特定实例
      if (instanceId) {
        const instance = ComponentWithPopUp.instances[instanceId];
        instance && instance.close();
      } else {
        // 关闭所有实例
        for (const [id, instance] of Object.entries(
          ComponentWithPopUp.instances
        )) {
          instance.close();
        }
      }
    }

    // 容器节点
    overlay: Element | null = null;
    // 实例ID
    instanceId: string | null = null;

    close() {
      this.overlay && unmountComponentAtNode(this.overlay);
    }

    componentDidMount() {
      this.props.onShow && this.props.onShow();
    }

    componentWillUnmount() {
      this.props.onClose && this.props.onClose();
      // 卸载时，清除引用
      if (this.instanceId) {
        delete ComponentWithPopUp.instances[this.instanceId];
      }
    }

    render() {
      const {
        container = document.body,
        children,
        transitionClass,
      } = this.props;
      const childElement = Children.only(children);

      // 拷贝children
      const clonedElement = cloneElement(childElement, {
        // 注入过渡效果类
        className: classnames(childElement.props.className, transitionClass),
        // 注入onClose方法
        onClose: () => {
          this.close();
          childElement.props.onClose && childElement.props.onClose();
        },
      });

      // 通过createPortal挂载到container下
      return createPortal(clonedElement, container);
    }
  };
}
