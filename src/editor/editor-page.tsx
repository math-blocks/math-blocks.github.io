import * as React from "react";
import type { Blob } from "buffer";

import { MathEditor, MathKeypad, FontDataContext } from "@math-blocks/react";
import * as Editor from "@math-blocks/editor";
import { parse, getFontData } from "@math-blocks/opentype";
import type { FontData } from "@math-blocks/opentype";
import { RadicalDegreeAlgorithm } from "@math-blocks/typesetter";

import "@math-blocks/react/dist/index.css";

import stix2 from "../../assets/STIX2Math.otf";
import latinModern from "../../assets/latinmodern-math.otf";
import gyreBonum from "../../assets/texgyrebonum-math.otf";
import gryePagella from "../../assets/texgyrepagella-math.otf";
import gryeSchola from "../../assets/texgyreschola-math.otf";
import gyreTermes from "../../assets/texgyretermes-math.otf";

import { HStack, VStack } from "../shared/layout";

import FormattingPalette from "../shared/formatting-palette";
import { examples } from "./examples";

const initialExample = 1;

const EditorPage = () => {
  const [stixFontData, setStixFontData] = React.useState<FontData | null>(null);
  const [lmFontData, setLmFontData] = React.useState<FontData | null>(null);
  const [bonumFontData, setBonumFontData] = React.useState<FontData | null>(
    null
  );
  const [pagellaFontData, setPagellaFontData] = React.useState<FontData | null>(
    null
  );
  const [scholaFontData, setScholaFontData] = React.useState<FontData | null>(
    null
  );
  const [termesFontData, setTermesFontData] = React.useState<FontData | null>(
    null
  );
  const [fontIndex, setFontIndex] = React.useState<number>(0);

  const [math, setMath] = React.useState<Editor.types.CharRow>(
    examples[initialExample]
  );

  const [radicalDegreeAlgorithm, setRadicalDegreeAlgorithm] =
    React.useState<RadicalDegreeAlgorithm>(RadicalDegreeAlgorithm.OpenType);

  const [showHitboxes, setShowHitboxes] = React.useState<boolean>(false);
  const [inline, setInline] = React.useState<boolean>(false);

  React.useEffect(() => {
    const loadFont = async (): Promise<void> => {
      const res = await fetch(stix2);
      const blob = await res.blob();
      const font = await parse(blob as Blob);
      setStixFontData(getFontData(font, "STIX2"));
    };

    loadFont();
  }, []);

  React.useEffect(() => {
    const loadFont = async (): Promise<void> => {
      const res = await fetch(latinModern);
      const blob = await res.blob();
      const font = await parse(blob as Blob);
      setLmFontData(getFontData(font, "LM-Math"));
    };

    loadFont();
  }, []);

  React.useEffect(() => {
    const loadFont = async (): Promise<void> => {
      const res = await fetch(gyreBonum);
      const blob = await res.blob();
      const font = await parse(blob as Blob);
      setBonumFontData(getFontData(font, "Bonum-Math"));
    };

    loadFont();
  }, []);

  React.useEffect(() => {
    const loadFont = async (): Promise<void> => {
      const res = await fetch(gryePagella);
      const blob = await res.blob();
      const font = await parse(blob as Blob);
      setPagellaFontData(getFontData(font, "Pagella-Math"));
    };

    loadFont();
  }, []);

  React.useEffect(() => {
    const loadFont = async (): Promise<void> => {
      const res = await fetch(gryeSchola);
      const blob = await res.blob();
      const font = await parse(blob as Blob);
      setScholaFontData(getFontData(font, "Schola-Math"));
    };

    loadFont();
  }, []);

  React.useEffect(() => {
    const loadFont = async (): Promise<void> => {
      const res = await fetch(gyreTermes);
      const blob = await res.blob();
      const font = await parse(blob as Blob);
      setTermesFontData(getFontData(font, "Termes-Math"));
    };

    loadFont();
  }, []);

  if (
    !stixFontData ||
    !lmFontData ||
    !bonumFontData ||
    !pagellaFontData ||
    !scholaFontData ||
    !termesFontData
  ) {
    return null;
  }

  const fonts = [
    stixFontData,
    lmFontData,
    bonumFontData,
    pagellaFontData,
    scholaFontData,
    termesFontData,
  ];
  const fontData = fonts[fontIndex];
  const fontSize = 64;

  // TODO:
  // - render glyphs using <path> and <text> side by side to compare their size
  // - fix radical and index positioning

  return (
    <FontDataContext.Provider value={fontData}>
      <HStack>
        <VStack>
          <FormattingPalette />
          {/* <EditingPanel /> */}
          <div style={{ height: 8 }} />
          <MathKeypad />
        </VStack>
        <VStack>
          <MathEditor
            fontSize={fontSize}
            readonly={false}
            row={math}
            radicalDegreeAlgorithm={radicalDegreeAlgorithm}
            showHitboxes={showHitboxes}
            inline={inline}
            style={{ marginTop: 8 }}
          />
          <br />
          <br />
          <div style={{ fontFamily: "Bonum-Math", fontSize: fontSize }}></div>
          <VStack style={{ gap: 4 }}>
            <HStack>
              <span style={{ fontFamily: "sans-serif", paddingRight: 8 }}>
                Example:{" "}
              </span>
              <select
                onChange={(e) => {
                  const index = parseInt(e.target.value);
                  setMath(examples[index]);
                }}
                defaultValue={initialExample}
              >
                <option value={0}>Simple Equation</option>
                <option value={1}>Quadratic Equation</option>
                <option value={2}>Adding Fractions</option>
                <option value={3}>All Node Types</option>
                <option value={4}>Tall Delimiters</option>
                <option value={5}>Nested Fractions</option>
                <option value={6}>Matrix</option>
                <option value={7}>Superscripts & Subscripts</option>
                <option value={8}>Integral</option>
                <option value={9}>Accents</option>
              </select>
            </HStack>
            <HStack>
              <span
                style={{
                  fontFamily: "sans-serif",
                  paddingRight: 8,
                }}
              >
                Font:{" "}
              </span>
              <select
                onChange={(e) => setFontIndex(parseInt(e.target.value))}
                defaultValue={fontIndex}
              >
                <option value={0}>STIX2</option>
                <option value={1}>Latin Modern</option>
                <option value={2}>Gyre Bonum</option>
                <option value={3}>Gyre Pagella</option>
                <option value={4}>Gyre Schola</option>
                <option value={5}>Gyre Termes</option>
              </select>
            </HStack>
            <HStack>
              <span
                style={{
                  fontFamily: "sans-serif",
                  paddingRight: 8,
                }}
              >
                Radical Degree Algorithm:{" "}
              </span>
              <select
                onChange={(e) =>
                  setRadicalDegreeAlgorithm(parseInt(e.target.value))
                }
                defaultValue={RadicalDegreeAlgorithm.OpenType}
              >
                <option value={RadicalDegreeAlgorithm.OpenType}>
                  OpenType
                </option>
                <option value={RadicalDegreeAlgorithm.MathML}>
                  MathML/Word
                </option>
              </select>
            </HStack>
            <HStack>
              <span
                style={{
                  fontFamily: "sans-serif",
                  paddingRight: 8,
                }}
              >
                Show Hitboxes
              </span>
              <input
                type="checkbox"
                onChange={(e) => setShowHitboxes(e.target.checked)}
              ></input>
            </HStack>
            <HStack>
              <span
                style={{
                  fontFamily: "sans-serif",
                  paddingRight: 8,
                }}
              >
                Inline
              </span>
              <input
                type="checkbox"
                checked={inline}
                onChange={(e) => setInline(e.target.checked)}
              ></input>
            </HStack>
          </VStack>
        </VStack>
      </HStack>
    </FontDataContext.Provider>
  );
};

export default EditorPage;
