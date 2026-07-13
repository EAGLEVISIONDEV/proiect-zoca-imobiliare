"use client";

import { ExtrudedText } from "@/components/ui/ExtrudedText";

type SceneSide = "left" | "right" | "center";

type SceneAnnotationCardProps = {
  visible: boolean;
  side: SceneSide;
  position: string;
  title: string;
  description?: string;
  badge?: string;
  price?: string;
};

const sideTilt: Record<SceneSide, string> = {
  left: "scene-label--left",
  right: "scene-label--right",
  center: "scene-label--center",
};

export function SceneAnnotationCard({
  visible,
  side,
  position,
  title,
  description,
  badge,
  price,
}: SceneAnnotationCardProps) {
  const spaceIndex = title.indexOf(" ");
  const titleLine1 = spaceIndex === -1 ? title : title.slice(0, spaceIndex);
  const titleLine2 = spaceIndex === -1 ? "" : title.slice(spaceIndex + 1);

  return (
    <div
      className={`scene-label-anchor absolute ${position} ${
        visible ? "scene-label-anchor--visible" : ""
      }`}
    >
      <div className="scene-label-perspective">
        <div className={`scene-label ${sideTilt[side]}`}>
          {badge ? (
            <ExtrudedText
              as="p"
              depth={1}
              animate={visible}
              className="scene-label__badge"
            >
              {badge}
            </ExtrudedText>
          ) : null}

          <div className="scene-label__title-wrap">
            <ExtrudedText
              as="h3"
              depth={2}
              animate={visible}
              className="scene-label__title"
            >
              {titleLine1}
            </ExtrudedText>
            {titleLine2 ? (
              <ExtrudedText
                as="span"
                depth={2}
                animate={visible}
                className="scene-label__title scene-label__title--line2"
              >
                {titleLine2}
              </ExtrudedText>
            ) : null}
          </div>

          {description ? (
            <ExtrudedText
              as="p"
              depth={1}
              animate={visible}
              className="scene-label__description"
            >
              {description}
            </ExtrudedText>
          ) : null}

          {price ? (
            <ExtrudedText
              as="p"
              depth={1}
              animate={visible}
              className="scene-label__price"
            >
              {price}
            </ExtrudedText>
          ) : null}
        </div>
      </div>
    </div>
  );
}
