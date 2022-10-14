import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { workOptions } from "utils/formOptions";

// Styled Components
import { BoldSpan } from "styled/typography";
import {
  HireGridForm,
  StyledHireButton,
  Label,
  Input,
  StyledSelect,
  StyledTextArea,
  EstimatedCost,
  FormGroup,
} from "../styled/StyledHireForm";
import { ErrorMessage } from "styled/forms";

type THireFormWork =
  | "Mix"
  | "Mix + Edit"
  | "Master"
  | "Mix & Master"
  | "Produce";

const HireForm = () => {
  const getTotalCost = (numTracks: number, work: string) => {
    if (
      !(
        work === "Mix" ||
        work === "Mix + Edit" ||
        work === "Master" ||
        work === "Mix & Master" ||
        work === "Produce"
      )
    ) {
      return 0;
    }
    const pricePerTrack = {
      Mix: 250,
      "Mix + Edit": 325,
      Master: 400,
      "Mix & Master": 600,
      Produce: 475,
    };

    return numTracks * pricePerTrack[work];
  };

  const queries = window.location.search;
  const params = new URLSearchParams(queries);

  const tracksParam = params.get("tracks");
  const workParam = params.get("work");

  // Takes URL Search Params for work and translates them to proper type
  const workTypeParamConversionMap = {
    Mix: "Mix",
    MixEdit: "Mix + Edit",
    Master: "Master",
    MixMaster: "Mix & Master",
    Produce: "Produce",
  };

  const isValidKey =
    workParam === "Mix" ||
    workParam === "MixEdit" ||
    workParam === "Master" ||
    workParam === "MixMaster" ||
    workParam === "Produce";

  const workInit =
    workParam && isValidKey
      ? workTypeParamConversionMap[workParam]
      : workOptions[0];
  const numTracksInit = tracksParam ?? "1";

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: "",
        work: workInit,
        numTracks: numTracksInit,
        email: "",
        subject: "",
        message: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Name required"),
        email: Yup.string().email("Invalid Email").required("Email required"),
        subject: Yup.string().required("Subject required"),
        message: Yup.string().required("Must include a message"),
      })}
      onSubmit={async (
        { name, work, numTracks, email, subject, message },
        { resetForm }
      ) => {
        const data = {
          name: name,
          work: work,
          numTracks: numTracks,
          email: email,
          subject: subject,
          message: message,
        };

        const res = await fetch("/api/email/hire", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          resetForm();
        } else {
          console.log(res.status, ": ERROR");
        }
      }}
    >
      {(formik) => (
        <HireGridForm aria-label="Hire Form" onSubmit={formik.handleSubmit}>
          <Label htmlFor="name">Name:</Label>
          <div>
            <Input
              type="text"
              id="name"
              color={"2"}
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <ErrorMessage>{formik.errors.name}</ErrorMessage>
            )}
          </div>
          <Label rowStart={1} rowEnd={2} colStart={3} htmlFor="work">
            Work:
          </Label>
          <StyledSelect
            id="work"
            rowStart={1}
            rowEnd={2}
            colStart={4}
            color={"2"}
            {...formik.getFieldProps("work")}
          >
            <option value="Mix">Mix</option>
            <option value="Mix + Edit">Mix + Edit</option>
            <option value="Master">Master</option>
            <option value="Mix & Master">Mix &amp; Master</option>
            <option value="Produce">Produce</option>
          </StyledSelect>
          <Label rowStart={2} rowEnd={3} colStart={3} htmlFor="numTracks">
            Tracks:
          </Label>
          <StyledSelect
            id="numTracks"
            rowStart={2}
            rowEnd={3}
            colStart={4}
            color={"2"}
            {...formik.getFieldProps("numTracks")}
          >
            {Array.from(Array(12).keys()).map((n) => (
              <option value={n + 1}>{n + 1}</option>
            ))}
          </StyledSelect>

          <Label htmlFor="email">Email:</Label>
          <FormGroup>
            <Input
              type="email"
              id="email"
              color={"2"}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            )}
          </FormGroup>

          <Label htmlFor="subject" rowStart={3}>
            Subject:
          </Label>
          <FormGroup colStart={2} colEnd={-1}>
            <Input
              type="text"
              id="subject"
              color={"2"}
              {...formik.getFieldProps("subject")}
            />
            {formik.touched.subject && formik.errors.subject && (
              <ErrorMessage>{formik.errors.subject}</ErrorMessage>
            )}
          </FormGroup>

          <Label htmlFor="message">Message:</Label>
          <FormGroup colStart={2} colEnd={-1}>
            <StyledTextArea id="message" {...formik.getFieldProps("message")} />
            {formik.touched.message && formik.errors.message && (
              <ErrorMessage>{formik.errors.message}</ErrorMessage>
            )}
          </FormGroup>

          <EstimatedCost>
            <BoldSpan>Estimate:</BoldSpan> $
            {getTotalCost(Number(formik.values.numTracks), formik.values.work)}
            .00
          </EstimatedCost>
          <StyledHireButton type="submit">Submit</StyledHireButton>
        </HireGridForm>
      )}
    </Formik>
  );
};

export default HireForm;
